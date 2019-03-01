import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
class Page {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  name: string

  @Column()
  url: string

  @Column({ default: () => 'now()' })
  createdAt?: string

  constructor (name: string, url: string) {
    this.name = name
    this.url = url
  }
}

class CreatePageData {
  readonly name: string

  readonly url: string

  constructor (name: string, url: string) {
    this.name = name
    this.url = url
  }
}

class UpdatePageData {
  readonly name?: string

  readonly url?: string

  constructor (name: string, url: string) {
    this.name = name
    this.url = url
  }
}

class ParamsWithId {
  readonly id: number

  constructor (id: number) {
    this.id = id
  }
}

export { Page, CreatePageData, UpdatePageData, ParamsWithId }
