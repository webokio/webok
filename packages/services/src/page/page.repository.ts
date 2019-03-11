import { Repository, EntityRepository } from 'typeorm'
import { Page } from '@webok/core/lib/page'

@EntityRepository(Page)
export class PageRepository extends Repository<Page> {}
