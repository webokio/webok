import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { DateTime, DurationObject } from 'luxon'
import { nowAsString, dateTimeAsString } from '../common/datetime'
import { User } from '../user/user.entity'

@Entity()
// This entity should not be exposed to public API.
export class LoginRecord {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne((type) => User, { nullable: false, eager: true })
  user!: User

  @Column()
  refreshTokenHash!: string

  @Column()
  createdAt: string = nowAsString()

  @Column()
  expiredAt!: string

  constructor(data?: { user: User; refreshTokenHash: string; duration: DurationObject }) {
    if (data) {
      const { user, refreshTokenHash, duration } = data
      this.user = user
      this.refreshTokenHash = refreshTokenHash
      this.extendExpiration(duration)
    }
  }

  isExpired (): boolean {
    return this.expiredAt < nowAsString()
  }

  extendExpiration (duration: DurationObject) {
    this.expiredAt = dateTimeAsString(DateTime.local().plus(duration))
  }
}
