import { ApiModelProperty } from '@nestjs/swagger'
import { IsString, IsEmail } from '../common/validator'
import { Repository, InjectRepository } from '../common/service'
import { User } from './user.entity'
import { hash } from './password.helper'

export class CreateUserData {
  @ApiModelProperty()
  @IsString()
  readonly name: string

  @ApiModelProperty()
  @IsEmail()
  readonly email: string

  @ApiModelProperty()
  readonly password: string

  constructor (name: string, email: string, password: string) {
    this.name = name
    this.email = email
    this.password = password
  }
}

export class UserService {
  constructor (
    @InjectRepository(User)
    private readonly pageRepository: Repository<User>,
  ) {}

  async create ({ name, email, password }: CreateUserData): Promise<User> {
    // TODO: check email uniqueness
    const passwordHash = await hash(password)
    return this.pageRepository.save(new User(name, email, passwordHash))
  }
}
