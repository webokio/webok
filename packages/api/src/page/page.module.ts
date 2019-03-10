import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Page, PageRepository, PageService } from '@webok/core/lib/page'
import { PageController } from './page.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Page, PageRepository])],
  providers: [PageService],
  controllers: [PageController],
})
export class PageModule {}
