import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { User } from '../user/user.entity'

export interface LoginRecordOptions {
  readonly user: User
  readonly refreshTokenHash: string
  readonly createdAt: string
  readonly expiredAt: string
}

@Entity()
export class LoginRecord {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne((type) => User, { nullable: false, eager: true })
  user!: User

  @Column()
  refreshTokenHash!: string

  @Column()
  createdAt!: string

  @Column()
  expiredAt!: string

  constructor (loginRecordOptions?: LoginRecordOptions) {
    if (loginRecordOptions) {
      const { user, refreshTokenHash, createdAt, expiredAt } = loginRecordOptions
      this.user = user
      this.refreshTokenHash = refreshTokenHash
      this.createdAt = createdAt
      this.expiredAt = expiredAt
    }
  }
}
