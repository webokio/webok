import { UserRepository } from '@webok/services/lib/user'
import { UserClient } from '@webok/client/lib/user'
import { ApiTester } from '../common/api-tester'
import { passwordHelperMock } from '../common/password-helper.mock'

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
    await userRepository.clear()
    await apiTester.close()
  })

  beforeEach(async () => {
    await userRepository.clear()
  })

  describe('create()', () => {
    it('should return a new user', async () => {
      const user = await userClient.create({ name: 'user1', email: 'user1@mail.com', password: 'password1' })
      expect(passwordHelperMock.hashPassword.mock.calls).toEqual([['password1']])
      expect(user).toBeDefined()
      expect(user.id).toBeDefined()
      expect(user.name).toBe('user1')
      expect(user.email).toBe('user1@mail.com')
      expect(user.passwordHash).toBeUndefined()
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
