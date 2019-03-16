import { Injectable, Inject } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { IAuthService, CreateAuthData, AuthPayload } from '@webok/core/lib/auth'
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

  async create ({ email, password }: CreateAuthData): Promise<String> {
    const user = Optional.ofNullable(await this.userRepository.findOne({ email }))
    const isCorrectPassword =
      user.isPresent() && (await this.passwordHelper.comparePassword(password, user.get().passwordHash))
    const payload: AuthPayload = { id: isCorrectPassword ? user.get().id : -1 }
    return this.jwtService.sign(payload)
  }
}
