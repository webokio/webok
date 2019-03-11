import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IUserService, User, CreateUserData } from '@webok/core/lib/user'
import { UserRepository } from './user.repository'
import { hashPassword } from './password.helper'

@Injectable()
export class UserService implements IUserService {
  constructor (
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async create ({ name, email, password }: CreateUserData): Promise<User> {
    // TODO: check email uniqueness
    const passwordHash = await hashPassword(password)
    return this.userRepository.save(new User(name, email, passwordHash))
  }
}
