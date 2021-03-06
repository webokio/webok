import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthDto, CreateAuthDto, ModifyAuthDto } from '@webok/core/lib/auth'
import { dateTimeAsString, nowAsString } from '@webok/helpers/lib/datetime.helper'
import { LoginRecord, LoginRecordRepository } from '@webok/models/lib/auth'
import { User, UserRepository } from '@webok/models/lib/user'
import crypto from 'crypto'
import { DateTime, DurationObject } from 'luxon'
import { AuthDtoMapper } from './auth-dto.mapper'
import { HashingService } from './hashing.service'

@Injectable()
// TODO remove all login records when changing password
export class AuthService {
  constructor (
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(LoginRecordRepository)
    private readonly loginRecordRepository: LoginRecordRepository,
    private readonly hashingService: HashingService,
    private readonly authDtoMapper: AuthDtoMapper,
    @Inject('config.auth.refreshTokenTTL')
    private readonly refreshTokenTTL: DurationObject,
  ) {}

  async create (createAuthDto: CreateAuthDto): Promise<AuthDto> {
    const { email, password } = createAuthDto
    const user: User | undefined = await this.userRepository.findOne({ email })
    if (!user) {
      throw new Error('Invalid email')
    }
    const isValidPassword: boolean = await this.hashingService.compare(password, user.passwordHash)
    if (!isValidPassword) {
      throw new Error('Invalid password')
    }
    const refreshToken = this.createRefreshToken()
    const refreshTokenHash: string = await this.hashingService.hash(refreshToken)
    const loginRecord: LoginRecord = await this.loginRecordRepository.save(
      new LoginRecord({
        user,
        refreshTokenHash,
        createdAt: nowAsString(),
        expiredAt: this.createLoginRecordExpiredAt(),
      }),
    )
    return this.authDtoMapper.fromLoginRecord(loginRecord, refreshToken)
  }

  async refresh (authId: number, modifyAuthDto: ModifyAuthDto): Promise<AuthDto> {
    const loginRecordToRefresh: LoginRecord | undefined = await this.loginRecordRepository.findOne({ id: authId })
    if (!loginRecordToRefresh) {
      throw new Error('Login record not found')
    }
    if (this.isLoginRecordExpired(loginRecordToRefresh)) {
      await this.loginRecordRepository.remove(loginRecordToRefresh)
      throw new Error('Expired refresh token')
    }
    const { refreshToken } = modifyAuthDto
    const isValidRefreshToken: boolean = await this.hashingService.compare(
      refreshToken,
      loginRecordToRefresh.refreshTokenHash,
    )
    if (!isValidRefreshToken) {
      throw new Error('Invalid refresh token')
    }
    loginRecordToRefresh.expiredAt = this.createLoginRecordExpiredAt()
    const loginRecord: LoginRecord = await this.loginRecordRepository.save(loginRecordToRefresh)
    return this.authDtoMapper.fromLoginRecord(loginRecord, refreshToken)
  }

  async remove (authId: number, modifyAuthDto: ModifyAuthDto): Promise<void> {
    const loginRecordToRemove: LoginRecord | undefined = await this.loginRecordRepository.findOne({ id: authId })
    if (!loginRecordToRemove) {
      // Do nothing if login record not found
      return
    }
    if (this.isLoginRecordExpired(loginRecordToRemove)) {
      // Remove anyway if expired
      await this.loginRecordRepository.remove(loginRecordToRemove)
      return
    }
    const { refreshToken } = modifyAuthDto
    const isValidRefreshToken: boolean = await this.hashingService.compare(
      refreshToken,
      loginRecordToRemove.refreshTokenHash,
    )
    if (!isValidRefreshToken) {
      return
    }
    // Everything is validated, remove the login record
    await this.loginRecordRepository.remove(loginRecordToRemove)
  }

  private isLoginRecordExpired (loginRecord: LoginRecord) {
    return loginRecord.expiredAt < nowAsString()
  }

  private createRefreshToken (): string {
    return crypto.randomBytes(32).toString('hex')
  }

  private createLoginRecordExpiredAt (): string {
    return dateTimeAsString(DateTime.local().plus(this.refreshTokenTTL))
  }
}
