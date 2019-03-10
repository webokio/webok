import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { UserRepository } from './user.repository'
import { CreateUserData } from './user.data'
import { hashPassword } from './password.helper'

@Injectable()
export class UserService {
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
