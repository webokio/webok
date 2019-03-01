import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PagesModule } from './pages/pages.module'

@Module({
  imports: [TypeOrmModule.forRoot(require('@webok/models/lib/ormconfig')), PagesModule],
})
export class AppModule {}
