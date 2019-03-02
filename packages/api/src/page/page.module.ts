import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Page, PageService } from '@webok/core/lib/page'
import { PageController } from './page.controller'

const PageServiceProvider = {
  provide: PageService,
  useClass: PageService,
}

@Module({
  imports: [TypeOrmModule.forFeature([Page])],
  controllers: [PageController],
  providers: [PageServiceProvider],
})
export class PageModule {}
