import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity()
class Page {
  @PrimaryColumn()
  readonly id: string

  @Column()
  name: string

  @Column()
  url: string

  @Column({ default: () => 'now()' })
  createdAt?: string

  constructor (id: string, name: string, url: string) {
    this.id = id
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
  readonly id: string

  constructor (id: string) {
    this.id = id
  }
}

export { Page, CreatePageData, UpdatePageData, ParamsWithId }
