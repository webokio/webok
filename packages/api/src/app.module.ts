import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmConfig } from '@webok/core/lib/typeorm.config'
import { PageModule } from './page'

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    PageModule,
  ],
})
export class AppModule {}
