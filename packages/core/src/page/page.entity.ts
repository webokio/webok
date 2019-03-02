import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { now } from '../common/datetime'

@Entity()
export class Page {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name: string

  @Column()
  url: string

  @Column()
  createdAt: string = now()

  constructor (name: string, url: string) {
    this.name = name
    this.url = url
  }
}
