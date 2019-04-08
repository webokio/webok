import { ApiModelProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MinLength } from 'class-validator'

export class CreateAuthDto {
  @ApiModelProperty()
  @IsEmail()
  readonly email!: string

  @ApiModelProperty()
  @IsString()
  @MinLength(5)
  readonly password!: string
}
