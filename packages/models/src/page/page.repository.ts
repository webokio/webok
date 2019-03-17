import { Repository, EntityRepository } from 'typeorm'
import { Page } from './page.entity'

@EntityRepository(Page)
export class PageRepository extends Repository<Page> {}
