import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Page, PageRepository } from '@webok/models/lib/page'
import { User, UserRepository } from '@webok/models/lib/user'
import { PageDtoMapper, PageService } from '@webok/services/lib/page'
import { PageController } from './page.controller'
import { AuthModule } from '../auth'

@Module({
  imports: [TypeOrmModule.forFeature([Page, PageRepository, User, UserRepository]), AuthModule],
  providers: [PageDtoMapper, PageService],
  controllers: [PageController],
})
export class PageModule {}
