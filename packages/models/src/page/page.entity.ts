import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

export interface PageOptions {
  readonly name: string
  readonly url: string
  readonly createdAt: string
}

@Entity()
export class Page {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  url!: string

  @Column()
  createdAt!: string

  constructor (pageOptions?: PageOptions) {
    if (pageOptions) {
      const { name, url, createdAt } = pageOptions
      this.name = name
      this.url = url
      this.createdAt = createdAt
    }
  }
}
