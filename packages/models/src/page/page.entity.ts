import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm'
import { User } from '../user/user.entity'

export interface PageOptions {
  readonly name: string
  readonly url: string
  readonly owner: User
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

  @ManyToOne((type) => User, (user) => user.pages, { nullable: false })
  owner!: User

  @Column()
  createdAt!: string

  constructor (pageOptions?: PageOptions) {
    if (pageOptions) {
      const { name, url, owner, createdAt } = pageOptions
      this.name = name
      this.url = url
      this.owner = owner
      this.createdAt = createdAt
    }
  }
}
