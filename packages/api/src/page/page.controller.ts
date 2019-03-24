import {
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common'
import {
  ApiUseTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger'
import { PageDto, CreatePageDto, UpdatePageDto } from '@webok/core/lib/page'
import { PageService } from '@webok/services/lib/page'

@Controller('pages')
@ApiUseTags('Pages')
export class PageController {
  constructor (private readonly pageService: PageService) {}

  @Get()
  @ApiOkResponse({ type: [PageDto] })
  async find (): Promise<PageDto[]> {
    const pageDtos = this.pageService.find()
    return pageDtos
  }

  @Post()
  @ApiCreatedResponse({ type: PageDto })
  @ApiBadRequestResponse({})
  async create (@Body() createPageDto: CreatePageDto): Promise<PageDto> {
    const pageDto = await this.pageService.create(createPageDto)
    return pageDto
  }

  @Get(':pageId')
  @ApiOkResponse({ type: PageDto })
  @ApiNotFoundResponse({})
  @ApiBadRequestResponse({})
  async get (@Param() pageId: number): Promise<PageDto> {
    const pageDto = await this.pageService.get(pageId)
    if (!pageDto) {
      throw new NotFoundException()
    }
    return pageDto
  }

  @Patch(':pageId')
  @ApiOkResponse({ type: PageDto })
  @ApiNotFoundResponse({})
  @ApiBadRequestResponse({})
  async update (@Param() pageId: number, @Body() updatePageDto: UpdatePageDto): Promise<PageDto> {
    const pageDto = await this.pageService.update(pageId, updatePageDto)
    if (!pageDto) {
      throw new NotFoundException()
    }
    return pageDto
  }

  @Delete(':pageId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({})
  @ApiBadRequestResponse({})
  async remove (@Param() pageId: number): Promise<void> {
    await this.pageService.remove(pageId)
  }
}
