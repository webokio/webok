import { TypeOrmModuleOptions } from '@nestjs/typeorm'
// TODO find a better way to load config in production, currently use root config by NODE_CONFIG_DIR
import config from 'config'
import path from 'path'
import { SnakeNamingStrategy } from './snake-naming'

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
  namingStrategy: new SnakeNamingStrategy(),
  entities: [path.join(__dirname, '../**/*.entity{.ts,.js}')],
  // Migrations
  migrationsTableName: 'typeorm_migrations',
  migrations: ['migrations/*.ts'],
  cli: { migrationsDir: 'migrations' },
}

export = TypeOrmConfig
