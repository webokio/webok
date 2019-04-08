import { EntityRepository, Repository } from 'typeorm'
import { LoginRecord } from './login-record.entity'

@EntityRepository(LoginRecord)
export class LoginRecordRepository extends Repository<LoginRecord> {}
