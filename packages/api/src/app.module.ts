import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PageModule } from './page'

@Module({
  imports: [
    TypeOrmModule.forRoot(require('@webok/core/lib/typeorm.config')),
    PageModule,
  ],
})
export class AppModule {}
