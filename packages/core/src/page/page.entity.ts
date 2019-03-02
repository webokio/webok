import { ApiModelProperty } from '@nestjs/swagger'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { now } from '../common/datetime'

@Entity()
export class Page {
  @ApiModelProperty()
  @PrimaryGeneratedColumn()
  id!: number

  @ApiModelProperty()
  @Column()
  name: string

  @ApiModelProperty()
  @Column()
  url: string

  @ApiModelProperty()
  @Column()
  createdAt: string = now()

  constructor (name: string, url: string) {
    this.name = name
    this.url = url
  }
}
