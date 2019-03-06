import { ApiModelProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
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
  @Exclude()
  @ApiModelProperty()
  passwordHash: string

  constructor (name: string, email: string, passwordHash: string) {
    this.name = name
    this.email = email
    this.passwordHash = passwordHash
  }
}
