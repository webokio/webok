import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Page, PageService } from '@webok/core/lib/page'
import { PageController } from './page.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Page])],
  providers: [PageService],
  controllers: [PageController],
})
export class PageModule {}
