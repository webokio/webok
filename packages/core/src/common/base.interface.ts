export interface WithFind<T> {
  find (): Promise<T[]>
}

export interface WithGet<T> {
  get (id: number): Promise<T | undefined>
}

export interface WithCreate<T, CD> {
  create (data: CD): Promise<T>
}

export interface WithUpdate<T, UD> {
  update (id: number, data: UD): Promise<T | undefined>
}

export interface WithRemove {
  remove (id: number): Promise<void>
}

export interface IBaseService<T, CD = T, UD = T>
  extends WithFind<T>,
    WithGet<T>,
    WithCreate<T, CD>,
    WithUpdate<T, UD>,
    WithRemove {}
