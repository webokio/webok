import { Module } from '@nestjs/common'
import { TypeOrmRootModule } from './common/typeorm'
import { UserModule } from './user'
import { PageModule } from './page'

@Module({
  imports: [TypeOrmRootModule, UserModule, PageModule],
})
export class AppModule {}
