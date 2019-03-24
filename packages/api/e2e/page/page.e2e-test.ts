import { PageDto } from '@webok/core/lib/page'
import { PageRepository } from '@webok/models/lib/page'
import { PageClient } from '@webok/client/lib/page'
import { ApiTester } from '../api-tester'

describe('Page', () => {
  let apiTester: ApiTester
  let pageRepository: PageRepository
  let pageClient: PageClient

  beforeAll(async () => {
    apiTester = await ApiTester.create()
    pageRepository = apiTester.module.get<PageRepository>(PageRepository)
    pageClient = apiTester.apiClient.pages
  })

  afterAll(async () => {
    await pageRepository.delete({})
    await apiTester.close()
  })

  beforeEach(async () => {
    await pageRepository.delete({})
  })

  describe('find()', () => {
    it('should return all pages', async () => {
      expect((await pageClient.find()).data).toEqual([])
      await pageClient.create({ name: 'site1', url: 'https://site1.com' })
      await pageClient.create({ name: 'site2', url: 'https://site2.com' })
      const pages: PageDto[] = (await pageClient.find()).data
      expect(pages.length).toBe(2)
      expect(pages.some((page) => page.name === 'site1' && page.url === 'https://site1.com')).toBe(true)
      expect(pages.some((page) => page.name === 'site2' && page.url === 'https://site2.com')).toBe(true)
    })
  })

  describe('get()', () => {
    let page: PageDto

    beforeEach(async () => {
      page = (await pageClient.create({ name: 'site1', url: 'https://site1.com' })).data
    })

    it('should return the page if found', async () => {
      const foundPage: PageDto = (await pageClient.get(page.id)).data
      expect(foundPage).toEqual(page)
    })

    it('should return not found if no id', async () => {
      await apiTester.expectNotFound(() => {
        return pageClient.get(-page.id)
      })
    })

    it('should return bad request if invalid id', async () => {
      await apiTester.expectBadRequest(() => {
        return pageClient.get(('a' as unknown) as number)
      })
    })
  })

  describe('create()', () => {
    it('should return a new page', async () => {
      const page: PageDto = (await pageClient.create({ name: 'site1', url: 'https://site1.com' })).data
      expect(page).toBeDefined()
      expect(page.id).toBeDefined()
      expect(page.name).toBe('site1')
      expect(page.url).toBe('https://site1.com')
      expect(page.createdAt).toBeDefined()
    })

    it('should return bad request if invalid data', async () => {
      await apiTester.expectBadRequest(() => {
        return pageClient.create({ name: (1 as unknown) as string, url: 'https://site1.com' })
      })
      await apiTester.expectBadRequest(() => {
        return pageClient.create({ name: 'site1', url: 'site1' })
      })
    })
  })

  describe('update()', () => {
    let page: PageDto

    beforeEach(async () => {
      page = (await pageClient.create({ name: 'site1', url: 'https://site1.com' })).data
    })

    it('should update the page', async () => {
      const updatedPage: PageDto = (await pageClient.update(page.id, { name: 'site2', url: 'https://site2.com' })).data
      expect(updatedPage.name).toBe('site2')
      expect(updatedPage.url).toBe('https://site2.com')
    })

    it('should return not found if no id', async () => {
      await apiTester.expectNotFound(() => {
        return pageClient.update(-page.id, { name: 'site2', url: 'https://site2.com' })
      })
    })

    it('should return bad request if invalid id', async () => {
      await apiTester.expectBadRequest(() => {
        return pageClient.update(('a' as unknown) as number, { name: 'site2', url: 'https://site2.com' })
      })
    })

    it('should return bad request if invalid data', async () => {
      await apiTester.expectBadRequest(() => {
        return pageClient.update(page.id, { name: (1 as unknown) as string, url: 'https://site2.com' })
      })
      await apiTester.expectBadRequest(() => {
        return pageClient.update(page.id, { name: 'site2', url: 'site2' })
      })
    })
  })

  describe('remove()', () => {
    let page: PageDto

    beforeEach(async () => {
      page = (await pageClient.create({ name: 'site1', url: 'https://site1.com' })).data
    })

    it('should remove the page', async () => {
      await pageClient.remove(page.id)
      await apiTester.expectNotFound(() => {
        return pageClient.get(page.id)
      })
    })

    it('should return bad request if invalid id', async () => {
      await apiTester.expectBadRequest(() => {
        return pageClient.remove(('a' as unknown) as number)
      })
    })
  })
})
