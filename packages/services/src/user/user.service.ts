import { Injectable, Inject } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IUserService, IPasswordHelper } from '@webok/core/lib/user'
import { User, UserRepository, CreateUserData } from '@webok/models/lib/user'

@Injectable()
export class UserService implements IUserService {
  constructor (
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @Inject('IPasswordHelper')
    private readonly passwordHelper: IPasswordHelper,
  ) {}

  async create ({ name, email, password }: CreateUserData): Promise<User> {
    // TODO: check email uniqueness
    const passwordHash = await this.passwordHelper.hashPassword(password)
    return this.userRepository.save(new User(name, email, passwordHash))
  }
}
