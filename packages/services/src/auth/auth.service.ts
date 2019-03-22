import { Injectable, Inject } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { IAuthService, IPasswordHelper } from '@webok/core/lib/auth'
import { Optional } from '@webok/core/lib/common/optional'
import { CreateAuthData, RefreshAuthData, AuthPayload, Auth } from '@webok/models/lib/auth'
import { UserRepository, User } from '@webok/models/lib/user'

@Injectable()
export class AuthService implements IAuthService {
  constructor (
    private readonly jwtService: JwtService,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
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
    const payload: AuthPayload = { userId: user.id }
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: '',
    }
  }

  async refresh ({ refreshToken }: RefreshAuthData): Promise<Auth> {
    return {
      accessToken: '',
      refreshToken: '',
    }
  }
}
