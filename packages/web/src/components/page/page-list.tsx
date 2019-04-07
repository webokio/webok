import { Component, Vue, Prop } from 'vue-property-decorator'
import { PageDto } from '@webok/core/es6/page'

@Component({})
export class PageList extends Vue {
  @Prop({ type: Array, required: true })
  private readonly pages!: PageDto[]

  render () {
    return (
      <div>
        <ul>
          {this.pages.map((page) => {
            return (
              <li key={page.id}>
                <nuxt-link to={`/pages/${page.id}`}>{page.name}</nuxt-link>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
