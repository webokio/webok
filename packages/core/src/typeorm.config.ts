import path from 'path'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '58.181.37.175',
  port: 60016,
  database: 'test',
  username: 'sodas_dev_user',
  password: 'sodas_dev_secret',
  entities: [path.join(__dirname, '**/*.entity{.ts,.js}')],
  // Migrations
  migrationsTableName: 'typeorm_migrations',
  migrations: ['migrations/*.ts'],
  cli: { migrationsDir: 'migrations' },
}

export = TypeOrmConfig
