import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateUserDto, UserDto } from '@webok/core/lib/user'
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
    const passwordHash: string = await this.hashingService.hash(password)
    const user: User = await this.userRepository.save(new User({ name, email, passwordHash }))
    return this.userDtoMapper.fromUser(user)
  }

  async get (userId: number): Promise<UserDto | undefined> {
    const user: User | undefined = await this.userRepository.findOne({ id: userId })
    if (!user) {
      return
    }
    return this.userDtoMapper.fromUser(user)
  }
}
