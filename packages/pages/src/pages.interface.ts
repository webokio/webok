import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger'
import { registerDecorator, ValidationOptions, IsString, MinLength, IsUrl, IsOptional } from 'class-validator'
import { Entity, Column, PrimaryColumn } from 'typeorm'

const IsUrlFriendly = (validationOptions?: ValidationOptions) => (object: Object, propertyName: string) => {
  registerDecorator({
    name: 'isUrlFriendly',
    target: object.constructor,
    propertyName,
    options: validationOptions,
    validator: {
      validate (value: string) {
        return /^[\w|-]+$/.test(value)
      },
    },
  })
}

class ParamsWithId {
  @ApiModelProperty()
  @IsString()
  @MinLength(5)
  @IsUrlFriendly({ message: 'id must be url friendly' })
  readonly id: string

  constructor (id: string) {
    this.id = id
  }
}

@Entity()
class Page {
  @ApiModelProperty()
  @PrimaryColumn()
  readonly id: string

  @ApiModelProperty()
  @Column()
  name: string

  @ApiModelProperty()
  @Column()
  url: string

  @ApiModelProperty()
  @Column({ default: () => 'now()' })
  createdAt?: string

  constructor (id: string, name: string, url: string) {
    this.id = id
    this.name = name
    this.url = url
  }
}

class CreatePageData {
  @ApiModelProperty()
  @IsString()
  @MinLength(3)
  readonly name: string

  @ApiModelProperty()
  @IsUrl()
  readonly url: string

  constructor (name: string, url: string) {
    this.name = name
    this.url = url
  }
}

class UpdatePageData {
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(3)
  readonly name?: string

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsUrl()
  readonly url?: string
}

export { Page, CreatePageData, UpdatePageData, ParamsWithId }
