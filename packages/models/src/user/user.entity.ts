import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Page } from '../page/page.entity'

export interface UserOptions {
  readonly name: string
  readonly email: string
  readonly passwordHash: string
}

@Entity({ name: 'app_user' })
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column({ unique: true })
  email!: string

  @Column()
  passwordHash!: string

  @OneToMany((type) => Page, (page) => page.owner)
  pages!: Page[]

  constructor (userOptions?: UserOptions) {
    if (userOptions) {
      const { name, email, passwordHash } = userOptions
      this.name = name
      this.email = email
      this.passwordHash = passwordHash
    }
  }
}
