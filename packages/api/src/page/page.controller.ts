import { Controller, Get, Post, Patch, Delete, Param, Body, NotFoundException } from '@nestjs/common'
import { ApiUseTags, ApiOkResponse, ApiCreatedResponse, ApiNotFoundResponse } from '@nestjs/swagger'
import { PageService, Page, CreatePageData, UpdatePageData } from '@webok/core/lib/page'

@Controller('pages')
@ApiUseTags('Pages')
export class PageController {
  constructor (private readonly pageService: PageService) {}

  @Get()
  @ApiOkResponse({ type: [Page] })
  find (): Promise<Page[]> {
    return this.pageService.find()
  }

  @Get(':id')
  @ApiOkResponse({ type: Page })
  @ApiNotFoundResponse({})
  async get (@Param('id') id: number): Promise<Page> {
    const page = await this.pageService.get(id)
    return page.orElseThrow(() => new NotFoundException())
  }

  @Post()
  @ApiCreatedResponse({ type: Page })
  create (@Body() data: CreatePageData): Promise<Page> {
    return this.pageService.create(data)
  }

  @Patch(':id')
  @ApiOkResponse({ type: Page })
  @ApiNotFoundResponse({})
  async update (@Param('id') id: number, @Body() data: UpdatePageData): Promise<Page> {
    const page = await this.pageService.update(id, data)
    return page.orElseThrow(() => new NotFoundException())
  }

  @Delete(':id')
  @ApiOkResponse({})
  async remove (@Param('id') id: number): Promise<void> {
    await this.pageService.remove(id)
  }
}
