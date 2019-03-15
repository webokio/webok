import { Server } from 'http'
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { Optional } from '@webok/core/lib/common/optional'
import { ApiClient } from '@webok/client'
import { AppModule } from '../../src/app.module'
import { configureFeatures } from '../../src/features'
import { passwordHelperToInject } from './password-helper.mock'

export class ApiTester {
  constructor (readonly module: TestingModule, readonly apiClient: ApiClient, private readonly app: INestApplication) {}

  static async create (): Promise<ApiTester> {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      // Mock PasswordHelper to reduce time to hash/verify password
      .overrideProvider('IPasswordHelper')
      .useValue(passwordHelperToInject)
      .compile()
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

  async expectEmpty<T> (fn: () => Promise<Optional<T>>): Promise<void> {
    const optionalResult = await fn()
    expect(optionalResult.isEmpty()).toBe(true)
  }

  async expectBadRequest (fn: () => Promise<any>): Promise<void> {
    return this.expectStatusCode(fn, 400)
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
