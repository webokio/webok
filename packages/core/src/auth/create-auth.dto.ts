import { ApiModelProperty } from '@nestjs/swagger'
import { IsString, MinLength, IsEmail } from 'class-validator'

export class CreateAuthDto {
  @ApiModelProperty()
  @IsEmail()
  readonly email!: string

  @ApiModelProperty()
  @IsString()
  @MinLength(5)
  readonly password!: string
}
