import { ApiModelProperty } from '@nestjs/swagger'
import { ICreateUserData } from '@webok/core/lib/user'
import { IsString, IsEmail, MinLength } from '../common/validator'

export class CreateUserData implements ICreateUserData {
  @ApiModelProperty()
  @IsString()
  readonly name!: string

  @ApiModelProperty()
  @IsEmail()
  readonly email!: string

  @ApiModelProperty()
  @IsString()
  @MinLength(5)
  readonly password!: string
}
