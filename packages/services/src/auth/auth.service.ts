import { Injectable, Inject } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import uuid from 'uuid/v4'
import { Optional } from '@webok/core/lib/common/optional'
import { IAuthService, IPasswordHelper } from '@webok/core/lib/auth'
import {
  LoginRecordRepository,
  LoginRecord,
  Auth,
  CreateAuthData,
  ModifyAuthData,
  AuthPayload,
} from '@webok/models/lib/auth'
import { UserRepository, User } from '@webok/models/lib/user'

@Injectable()
// TODO remove all login record when changing password
export class AuthService implements IAuthService {
  constructor (
    private readonly jwtService: JwtService,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(LoginRecordRepository)
    private readonly loginRecordRepository: LoginRecordRepository,
    @Inject('IPasswordHelper')
    private readonly passwordHelper: IPasswordHelper,
  ) {}

  async create ({ email, password }: CreateAuthData): Promise<Auth> {
    const optionalUser = Optional.ofNullable(await this.userRepository.findOne({ email }))
    if (optionalUser.isEmpty()) {
      throw new Error('Invalid email')
    }
    const user: User = optionalUser.get()
    const isValidPassword = await this.passwordHelper.verifyPassword(password, user.passwordHash)
    if (!isValidPassword) {
      throw new Error('Invalid password')
    }
    const refreshToken: string = this.generateRefreshToken()
    const refreshTokenHash = await this.passwordHelper.hashPassword(refreshToken)
    const loginRecord = await this.loginRecordRepository.save(
      new LoginRecord({ user, refreshTokenHash, duration: { weeks: 2 } }),
    )
    const payload: AuthPayload = { loginRecordId: loginRecord.id, userId: user.id }
    return {
      loginRecordId: loginRecord.id,
      accessToken: this.jwtService.sign(payload),
      refreshToken,
    }
  }

  async refresh (id: number, { refreshToken }: ModifyAuthData): Promise<Auth> {
    const optionalLoginRecord = Optional.ofNullable(await this.loginRecordRepository.findOne({ id }))
    if (optionalLoginRecord.isEmpty()) {
      throw new Error('Login record not found')
    }
    const loginRecord: LoginRecord = optionalLoginRecord.get()
    if (loginRecord.isExpired()) {
      await this.loginRecordRepository.remove(loginRecord)
      throw new Error('Expired refresh token')
    }
    const isValidRefreshToken = await this.passwordHelper.verifyPassword(refreshToken, loginRecord.refreshTokenHash)
    if (!isValidRefreshToken) {
      throw new Error('Invalid refresh token')
    }
    loginRecord.extendExpiration({ weeks: 2 })
    await this.loginRecordRepository.save(loginRecord)
    const payload: AuthPayload = { loginRecordId: loginRecord.id, userId: loginRecord.user.id }
    return {
      loginRecordId: loginRecord.id,
      accessToken: this.jwtService.sign(payload),
      refreshToken,
    }
  }

  async remove (id: number, { refreshToken }: ModifyAuthData): Promise<void> {
    const optionalLoginRecord = Optional.ofNullable(await this.loginRecordRepository.findOne({ id }))
    if (optionalLoginRecord.isEmpty()) {
      // Do nothing if login record not found
      return
    }
    const loginRecord: LoginRecord = optionalLoginRecord.get()
    if (loginRecord.isExpired()) {
      // Remove anyway if expired
      await this.loginRecordRepository.remove(loginRecord)
      return
    }
    const isValidRefreshToken = await this.passwordHelper.verifyPassword(refreshToken, loginRecord.refreshTokenHash)
    if (!isValidRefreshToken) {
      return
    }
    // Everything is validated, remove the login record
    await this.loginRecordRepository.remove(loginRecord)
  }

  private generateRefreshToken (): string {
    return uuid()
  }
}
