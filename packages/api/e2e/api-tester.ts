import { Server } from 'http'
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, HttpStatus } from '@nestjs/common'
import { ApiClient } from '@webok/client'
import { AppModule } from '../src/app.module'
import { configureFeatures } from '../src/features'

export class ApiTester {
  constructor (readonly module: TestingModule, readonly apiClient: ApiClient, private readonly app: INestApplication) {}

  static async create (): Promise<ApiTester> {
    const moduleBuilder = Test.createTestingModule({
      imports: [AppModule],
    })
    const module: TestingModule = await moduleBuilder.compile()
    const app: INestApplication = module.createNestApplication()
    await configureFeatures(app)
    await app.init()
    await app.listen(0)
    const server = app.getHttpServer() as Server
    const serverAddress = server.address()
    if (!serverAddress) {
      throw new Error('Server address not found')
    }
    const apiClient = new ApiClient(
      typeof serverAddress === 'string' ? serverAddress : `http://localhost:${serverAddress.port}`,
    )
    return new ApiTester(module, apiClient, app)
  }

  async close (): Promise<void> {
    await this.app.close()
  }

  async expectBadRequest (fn: () => Promise<any>): Promise<void> {
    return this.expectStatusCode(fn, HttpStatus.BAD_REQUEST)
  }

  async expectNotFound (fn: () => Promise<any>): Promise<void> {
    return this.expectStatusCode(fn, HttpStatus.NOT_FOUND)
  }

  private async expectStatusCode (fn: () => Promise<any>, statusCode: number): Promise<void> {
    try {
      await fn()
      fail()
    } catch (err) {
      expect(err.response.status).toBe(statusCode)
    }
  }
}
