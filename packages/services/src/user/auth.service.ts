import { Injectable, Inject } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { IAuthService, IPasswordHelper } from '@webok/core/lib/user'
import { Optional } from '@webok/core/lib/common/optional'
import { UserRepository, User, LoginData, LoginResult, AuthPayload } from '@webok/models/lib/user'

@Injectable()
export class AuthService implements IAuthService {
  constructor (
    private readonly jwtService: JwtService,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @Inject('IPasswordHelper')
    private readonly passwordHelper: IPasswordHelper,
  ) {}

  async login ({ email, password }: LoginData): Promise<LoginResult> {
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
    return new LoginResult(this.jwtService.sign(payload))
  }
}
