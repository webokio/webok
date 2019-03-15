import { Page } from '@webok/core/lib/page'
import { PageRepository } from '@webok/services/lib/page'
import { PageClient } from '@webok/client/lib/page'
import { ApiTester } from '../common/api-tester'

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
    await pageRepository.clear()
    await apiTester.close()
  })

  beforeEach(async () => {
    await pageRepository.clear()
  })

  describe('find()', () => {
    it('should return all pages', async () => {
      expect(await pageClient.find()).toEqual([])
      await pageClient.create({ name: 'site1', url: 'https://site1.com' })
      await pageClient.create({ name: 'site2', url: 'https://site2.com' })
      const pages = await pageClient.find()
      expect(pages.length).toBe(2)
      expect(pages.some((page) => page.name === 'site1' && page.url === 'https://site1.com')).toBe(true)
      expect(pages.some((page) => page.name === 'site2' && page.url === 'https://site2.com')).toBe(true)
    })
  })

  describe('get()', () => {
    let page: Page

    beforeEach(async () => {
      page = await pageClient.create({ name: 'site1', url: 'https://site1.com' })
    })

    it('should return the page if found', async () => {
      const optionalPage = await pageClient.get(page.id)
      expect(optionalPage.isPresent()).toBe(true)
      expect(optionalPage.get()).toEqual(page)
    })

    it('should return empty if not found', async () => {
      await apiTester.expectEmpty(() => {
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
      const page = await pageClient.create({ name: 'site1', url: 'https://site1.com' })
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
    let page: Page

    beforeEach(async () => {
      page = await pageClient.create({ name: 'site1', url: 'https://site1.com' })
    })

    it('should update the page', async () => {
      const updatedPage = (await pageClient.update(page.id, { name: 'site2', url: 'https://site2.com' })).get()
      expect(updatedPage.name).toBe('site2')
      expect(updatedPage.url).toBe('https://site2.com')
    })

    it('should return empty if not found', async () => {
      await apiTester.expectEmpty(() => {
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
    let page: Page

    beforeEach(async () => {
      page = await pageClient.create({ name: 'site1', url: 'https://site1.com' })
    })

    it('should remove the page', async () => {
      await pageClient.remove(page.id)
      await apiTester.expectEmpty(() => {
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
