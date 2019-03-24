import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserDto, CreateUserDto } from '@webok/core/lib/user'
import { User, UserRepository } from '@webok/models/lib/user'
import { HashingService } from '../auth/hashing.service'
import { UserDtoMapper } from './user-dto.mapper'

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly userDtoMapper: UserDtoMapper,
    private readonly hashingService: HashingService,
  ) {}

  async create (createUserDto: CreateUserDto): Promise<UserDto> {
    const { name, email, password } = createUserDto
    // TODO: check email uniqueness
    const passwordHash = await this.hashingService.hash(password)
    const user: User = await this.userRepository.save(new User({ name, email, passwordHash }))
    return this.userDtoMapper.fromUser(user)
  }
}
