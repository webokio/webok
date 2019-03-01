import { Page } from './'

export = {
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  database: 'webok',
  username: 'webok_dev_user',
  password: 'webok_dev_secret',
  migrations: ['migrations/*.ts'],
  cli: { migrationsDir: 'migrations' },
  entities: [Page],
}
