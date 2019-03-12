import { AxiosInstance } from 'axios'
import { Optional } from '@webok/core/lib/common/optional'

export const find = async <T>(httpClient: AxiosInstance): Promise<T[]> => {
  return (await httpClient.get<T[]>('/')).data
}

export const get = async <T>(httpClient: AxiosInstance, id: number): Promise<Optional<T>> => {
  try {
    const page = (await httpClient.get<T>(`/${id}`)).data
    return Optional.ofNonNull(page)
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return Optional.empty()
    }
    throw err
  }
}

export const create = async <T, CD>(httpClient: AxiosInstance, data: CD): Promise<T> => {
  return (await httpClient.post<T>('/', data)).data
}

export const update = async <T, UD>(httpClient: AxiosInstance, id: number, data: UD): Promise<Optional<T>> => {
  try {
    const page = (await httpClient.patch<T>(`/${id}`, data)).data
    return Optional.ofNonNull(page)
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return Optional.empty()
    }
    throw err
  }
}

export const remove = async (httpClient: AxiosInstance, id: number): Promise<void> => {
  await httpClient.delete(`/${id}`)
}

export class BaseClient<T, CD = T, UD = T> {
  private readonly httpClient: AxiosInstance

  constructor (createHttpClient: (path: string) => AxiosInstance, path: string) {
    this.httpClient = createHttpClient(path)
  }

  find (): Promise<T[]> {
    return find(this.httpClient)
  }

  get (id: number): Promise<Optional<T>> {
    return get(this.httpClient, id)
  }

  create (data: CD): Promise<T> {
    return create(this.httpClient, data)
  }

  update (id: number, data: UD): Promise<Optional<T>> {
    return update(this.httpClient, id, data)
  }

  remove (id: number): Promise<void> {
    return remove(this.httpClient, id)
  }
}
