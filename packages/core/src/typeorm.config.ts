import path from 'path'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
// TODO find a better way to load config in production, currently use root config by NODE_CONFIG_DIR
import config from 'config'

interface DatabaseConfig {
  host: string
  port: number
  database: string
  username: string
  password: string
}

const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  ...config.get<DatabaseConfig>('database'),
  entities: [path.join(__dirname, '**/*.entity{.ts,.js}')],
  // Migrations
  migrationsTableName: 'typeorm_migrations',
  migrations: ['migrations/*.ts'],
  cli: { migrationsDir: 'migrations' },
}

export = TypeOrmConfig
