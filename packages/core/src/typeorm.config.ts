import path from 'path'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'webok_dev',
  username: 'webok_dev_user',
  password: 'webok_dev_secret',
  entities: [path.join(__dirname, '**/*.entity{.ts,.js}')],
  // Migrations
  migrationsTableName: 'typeorm_migrations',
  migrations: ['migrations/*.ts'],
  cli: { migrationsDir: 'migrations' },
}

export = TypeOrmConfig
