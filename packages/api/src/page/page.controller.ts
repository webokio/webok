import { Controller, Get, Post, Patch, Delete, Param, Body, NotFoundException } from '@nestjs/common'
import { ApiUseTags, ApiOkResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiBadRequestResponse } from '@nestjs/swagger'
import { PageService, Page, CreatePageData, UpdatePageData } from '@webok/core/lib/page'

@ApiUseTags('Pages')
@Controller('pages')
export class PageController {
  constructor (private readonly pageService: PageService) {}

  @ApiOkResponse({ type: [Page] })
  @Get()
  find (): Promise<Page[]> {
    return this.pageService.find()
  }

  @ApiOkResponse({ type: Page })
  @ApiNotFoundResponse({})
  @ApiBadRequestResponse({})
  @Get(':id')
  async get (@Param('id') id: number): Promise<Page> {
    const page = await this.pageService.get(id)
    return page.orElseThrow(() => new NotFoundException())
  }

  @ApiCreatedResponse({ type: Page })
  @ApiBadRequestResponse({})
  @Post()
  create (@Body() data: CreatePageData): Promise<Page> {
    return this.pageService.create(data)
  }

  @ApiOkResponse({ type: Page })
  @ApiNotFoundResponse({})
  @ApiBadRequestResponse({})
  @Patch(':id')
  async update (@Param('id') id: number, @Body() data: UpdatePageData): Promise<Page> {
    const page = await this.pageService.update(id, data)
    return page.orElseThrow(() => new NotFoundException())
  }

  @ApiOkResponse({})
  @ApiBadRequestResponse({})
  @Delete(':id')
  async remove (@Param('id') id: number): Promise<void> {
    await this.pageService.remove(id)
  }
}
