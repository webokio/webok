import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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

  constructor (userOptions?: UserOptions) {
    if (userOptions) {
      const { name, email, passwordHash } = userOptions
      this.name = name
      this.email = email
      this.passwordHash = passwordHash
    }
  }
}
