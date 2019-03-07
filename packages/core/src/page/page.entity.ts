import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { ApiModelProperty } from '@nestjs/swagger'
import { now } from '../common/datetime'

@Entity()
export class Page {
  @PrimaryGeneratedColumn()
  @ApiModelProperty()
  id!: number

  @Column()
  @ApiModelProperty()
  name: string

  @Column()
  @ApiModelProperty()
  url: string

  @Column()
  @ApiModelProperty()
  createdAt: string = now()

  constructor (name: string, url: string) {
    this.name = name
    this.url = url
  }
}
