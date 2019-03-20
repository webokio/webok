import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { Exclude } from 'class-transformer'
import { ApiModelProperty } from '@nestjs/swagger'
import { IUser } from '@webok/core/lib/user'

@Entity({ name: 'app_user' })
export class User implements IUser {
  @PrimaryGeneratedColumn()
  @ApiModelProperty()
  id!: number

  @Column()
  @ApiModelProperty()
  name!: string

  @Column({ unique: true })
  @ApiModelProperty()
  email!: string

  @Column()
  @Exclude() // exclude passwordHash in controller response
  passwordHash!: string

  constructor (data?: { name: string; email: string; passwordHash: string }) {
    if (data) {
      const { name, email, passwordHash } = data
      this.name = name
      this.email = email
      this.passwordHash = passwordHash
    }
  }
}
