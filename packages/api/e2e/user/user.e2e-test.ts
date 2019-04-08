import { UserClient } from '@webok/client/lib/user'
import { UserDto } from '@webok/core/lib/user'
import { UserRepository } from '@webok/models/lib/user'
import { ApiTester } from '../api-tester'

describe('User', () => {
  let apiTester: ApiTester
  let userRepository: UserRepository
  let userClient: UserClient

  beforeAll(async () => {
    apiTester = await ApiTester.create()
    userRepository = apiTester.module.get<UserRepository>(UserRepository)
    userClient = apiTester.apiClient.users
  })

  afterAll(async () => {
    await userRepository.delete({})
    await apiTester.close()
  })

  beforeEach(async () => {
    await userRepository.delete({})
  })

  describe('create()', () => {
    it('should return a new user', async () => {
      const userDto: UserDto = (await userClient.create({
        name: 'user1',
        email: 'user1@mail.com',
        password: 'password1',
      })).data
      expect(userDto.id).toBeDefined()
      expect(userDto.name).toBe('user1')
      expect(userDto.email).toBe('user1@mail.com')
      expect((userDto as any).passwordHash).toBeUndefined()
    })

    it('should return bad request if invalid data', async () => {
      await apiTester.expectBadRequest(() => {
        return userClient.create({ name: (1 as unknown) as string, email: 'user1@mail.com', password: 'password1' })
      })
      await apiTester.expectBadRequest(() => {
        return userClient.create({ name: 'user1', email: 'user1', password: 'password1' })
      })
      await apiTester.expectBadRequest(() => {
        return userClient.create({ name: 'user1', email: 'user1@mail.com', password: 'x' })
      })
    })
  })
})
