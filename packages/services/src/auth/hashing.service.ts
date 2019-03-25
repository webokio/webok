import { Injectable } from '@nestjs/common'
import bcrypt from 'bcrypt'

@Injectable()
export class HashingService {
  private readonly saltRounds = 12

  async hash (secret: string): Promise<string> {
    return bcrypt.hash(secret, this.saltRounds)
  }

  async compare (secret: string, secretHash: string): Promise<boolean> {
    return bcrypt.compare(secret, secretHash)
  }
}
