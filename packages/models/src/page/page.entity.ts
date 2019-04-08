import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from '../user/user.entity'

export interface PageOptions {
  readonly owner: User
  readonly name: string
  readonly url: string
  readonly createdAt: string
}

@Entity()
export class Page {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne((type) => User, { nullable: false })
  owner!: User

  @Column()
  name!: string

  @Column()
  url!: string

  @Column()
  createdAt!: string

  constructor (pageOptions?: PageOptions) {
    if (pageOptions) {
      const { owner, name, url, createdAt } = pageOptions
      this.owner = owner
      this.name = name
      this.url = url
      this.createdAt = createdAt
    }
  }
}
