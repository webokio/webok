import { Repository, InjectRepository } from '../common/service'
import { User } from './user.entity'
import { CreateUserData } from './user.data'
import { hashPassword } from './password.helper'

export class UserService {
  constructor (
    @InjectRepository(User)
    private readonly pageRepository: Repository<User>,
  ) {}

  async create ({ name, email, password }: CreateUserData): Promise<User> {
    // TODO: check email uniqueness
    const passwordHash = await hashPassword(password)
    return this.pageRepository.save(new User(name, email, passwordHash))
  }
}
