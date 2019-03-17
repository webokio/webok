import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Page, PageRepository } from '@webok/models/lib/page'
import { PageService } from '@webok/services/lib/page'
import { PageController } from './page.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Page, PageRepository])],
  providers: [{ provide: 'IPageService', useClass: PageService }],
  controllers: [PageController],
})
export class PageModule {}
