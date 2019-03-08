import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { Exclude } from 'class-transformer'
import { ApiModelProperty } from '@nestjs/swagger'

@Entity({ name: 'app_user' })
export class User {
  @PrimaryGeneratedColumn()
  @ApiModelProperty()
  id!: number

  @Column()
  @ApiModelProperty()
  name: string

  @Column({ unique: true })
  @ApiModelProperty()
  email: string

  @Column()
  @Exclude() // exclude passwordHash in controller response
  @ApiModelProperty()
  passwordHash: string

  constructor (name: string, email: string, passwordHash: string) {
    this.name = name
    this.email = email
    this.passwordHash = passwordHash
  }
}
