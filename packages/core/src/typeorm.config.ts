import path from 'path'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  database: 'webok',
  username: 'webok_dev_user',
  password: 'webok_dev_secret',
  migrations: [path.join(__dirname, '../migrations/*.ts')],
  cli: { migrationsDir: 'migrations' },
  entities: [path.join(__dirname, '/**/*.entity.ts')],
}
