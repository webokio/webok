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
      const pageDtos: PageDto[] = (await pageClient.find()).data
      expect(pageDtos.length).toBe(2)
      expect(pageDtos.some((pageDto) => pageDto.name === 'site1' && pageDto.url === 'https://site1.com')).toBe(true)
      expect(pageDtos.some((pageDto) => pageDto.name === 'site2' && pageDto.url === 'https://site2.com')).toBe(true)
    })
  })

  describe('get()', () => {
    let pageDto: PageDto

    beforeEach(async () => {
      pageDto = (await pageClient.create({ name: 'site1', url: 'https://site1.com' })).data
    })

    it('should return the page if found', async () => {
      const foundPageDto: PageDto = (await pageClient.get(pageDto.id)).data
      expect(foundPageDto).toEqual(pageDto)
    })

    it('should return not found if no id', async () => {
      await apiTester.expectNotFound(() => {
        return pageClient.get(-pageDto.id)
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
      const pageDto: PageDto = (await pageClient.create({ name: 'site1', url: 'https://site1.com' })).data
      expect(pageDto).toBeDefined()
      expect(pageDto.id).toBeDefined()
      expect(pageDto.name).toBe('site1')
      expect(pageDto.url).toBe('https://site1.com')
      expect(pageDto.createdAt).toBeDefined()
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
    let pageDto: PageDto

    beforeEach(async () => {
      pageDto = (await pageClient.create({ name: 'site1', url: 'https://site1.com' })).data
    })

    it('should update the page', async () => {
      const updatedPageDto: PageDto = (await pageClient.update(pageDto.id, { name: 'site2', url: 'https://site2.com' })).data
      expect(updatedPageDto.name).toBe('site2')
      expect(updatedPageDto.url).toBe('https://site2.com')
    })

    it('should return not found if no id', async () => {
      await apiTester.expectNotFound(() => {
        return pageClient.update(-pageDto.id, { name: 'site2', url: 'https://site2.com' })
      })
    })

    it('should return bad request if invalid id', async () => {
      await apiTester.expectBadRequest(() => {
        return pageClient.update(('a' as unknown) as number, { name: 'site2', url: 'https://site2.com' })
      })
    })

    it('should return bad request if invalid data', async () => {
      await apiTester.expectBadRequest(() => {
        return pageClient.update(pageDto.id, { name: (1 as unknown) as string, url: 'https://site2.com' })
      })
      await apiTester.expectBadRequest(() => {
        return pageClient.update(pageDto.id, { name: 'site2', url: 'site2' })
      })
    })
  })

  describe('remove()', () => {
    let pageDto: PageDto

    beforeEach(async () => {
      pageDto = (await pageClient.create({ name: 'site1', url: 'https://site1.com' })).data
    })

    it('should remove the page', async () => {
      await pageClient.remove(pageDto.id)
      await apiTester.expectNotFound(() => {
        return pageClient.get(pageDto.id)
      })
    })

    it('should return bad request if invalid id', async () => {
      await apiTester.expectBadRequest(() => {
        return pageClient.remove(('a' as unknown) as number)
      })
    })
  })
})
