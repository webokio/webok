import { Injectable, Inject } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { IAuthService, LoginData, Auth, AuthPayload } from '@webok/core/lib/auth'
import { IPasswordHelper } from '@webok/core/lib/user'
import { Optional } from '@webok/core/lib/common/optional'
import { UserRepository } from '../user'

@Injectable()
export class AuthService implements IAuthService {
  constructor (
    private readonly jwtService: JwtService,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @Inject('IPasswordHelper')
    private readonly passwordHelper: IPasswordHelper,
  ) {}

  async login ({ email, password }: LoginData): Promise<Auth> {
    const user = Optional.ofNullable(await this.userRepository.findOne({ email }))
    const isCorrectPassword =
      user.isPresent() && (await this.passwordHelper.comparePassword(password, user.get().passwordHash))
    if (!isCorrectPassword) {
      throw new Error('LoginData incorrect')
    }
    const payload: AuthPayload = { userId: user.get().id }
    const auth: Auth = { token: this.jwtService.sign(payload) }
    return auth
  }
}
