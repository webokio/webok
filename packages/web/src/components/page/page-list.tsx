import { Component, Vue, Prop } from 'vue-property-decorator'
import { PageDto } from '@webok/core/es6/page'

@Component({})
export class PageList extends Vue {
  @Prop({ type: Array, required: true })
  private readonly pageDtos!: PageDto[]

  render () {
    return (
      <div>
        <ul>
          {this.pageDtos.map((pageDto) => {
            return (
              <li key={pageDto.id}>
                <nuxt-link to={`/pages/${pageDto.id}`}>{pageDto.name}</nuxt-link>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
