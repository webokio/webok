import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import TypeOrmConfig from '@webok/core/lib/typeorm/typeorm.config'
import { UserModule } from './user'
import { PageModule } from './page'

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig), UserModule, PageModule],
})
export class AppModule {}
