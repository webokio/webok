import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Page, PageRepository } from '@webok/models/lib/page'
import { User, UserRepository } from '@webok/models/lib/user'
import { PageDtoMapper, PageService } from '@webok/services/lib/page'
import { AuthModule } from '../auth'
import { UserModule } from '../user'
import { PageController } from './page.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([Page, PageRepository, User, UserRepository]),
    // Import AuthModule to use default passport strategy
    AuthModule,
    UserModule,
  ],
  providers: [PageDtoMapper, PageService],
  controllers: [PageController],
})
export class PageModule {}
