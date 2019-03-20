import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { ApiModelProperty } from '@nestjs/swagger'
import { IPage } from '@webok/core/lib/page'
import { now } from '../common/datetime'

@Entity()
export class Page implements IPage {
  @PrimaryGeneratedColumn()
  @ApiModelProperty()
  id!: number

  @Column()
  @ApiModelProperty()
  name!: string

  @Column()
  @ApiModelProperty()
  url!: string

  @Column()
  @ApiModelProperty()
  createdAt: string = now()

  constructor (data?: { name: string; url: string }) {
    if (data) {
      const { name, url } = data
      this.name = name
      this.url = url
    }
  }
}
