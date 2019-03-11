import { Repository, EntityRepository } from 'typeorm'
import { User } from '@webok/core/lib/user'

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
