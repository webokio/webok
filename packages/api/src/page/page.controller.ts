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
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common'
import {
  ApiUseTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiModelProperty,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { IsNumberString } from 'class-validator'
import { PageDto, CreatePageDto, UpdatePageDto } from '@webok/core/lib/page'
import { PageService } from '@webok/services/lib/page'
import { AuthGuard } from '@nestjs/passport'
import { RequestInterface } from '../auth/auth-request.interface'

class PageIdParam {
  @ApiModelProperty()
  @IsNumberString()
  readonly pageId!: number
}

@Controller('pages')
@ApiUseTags('Pages')
export class PageController {
  constructor (private readonly pageService: PageService) {}

  @Get()
  @ApiOkResponse({ type: [PageDto] })
  async find (): Promise<PageDto[]> {
    const pageDtos: PageDto[] = await this.pageService.find()
    return pageDtos
  }

  @Post()
  @UseGuards(AuthGuard())
  @ApiCreatedResponse({ type: PageDto })
  @ApiBadRequestResponse({})
  @ApiUnauthorizedResponse({})
  async create (@Req() req: RequestInterface, @Body() createPageDto: CreatePageDto): Promise<PageDto> {
    try {
      const pageDto: PageDto = await this.pageService.create(req.user.userId, createPageDto)
      return pageDto
    } catch (err) {
      console.log(err)
      throw new BadRequestException('Invalid page')
    }
  }

  @Get(':pageId')
  @ApiOkResponse({ type: PageDto })
  @ApiNotFoundResponse({})
  @ApiBadRequestResponse({})
  async get (@Param() { pageId }: PageIdParam): Promise<PageDto> {
    const pageDto: PageDto | undefined = await this.pageService.get(pageId)
    if (!pageDto) {
      throw new NotFoundException()
    }
    return pageDto
  }

  @Patch(':pageId')
  @ApiOkResponse({ type: PageDto })
  @ApiNotFoundResponse({})
  @ApiBadRequestResponse({})
  async update (@Param() { pageId }: PageIdParam, @Body() updatePageDto: UpdatePageDto): Promise<PageDto> {
    const pageDto: PageDto | undefined = await this.pageService.update(pageId, updatePageDto)
    if (!pageDto) {
      throw new NotFoundException()
    }
    return pageDto
  }

  @Delete(':pageId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({})
  @ApiBadRequestResponse({})
  async remove (@Param() { pageId }: PageIdParam): Promise<void> {
    await this.pageService.remove(pageId)
  }
}
