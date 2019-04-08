import { PageDto } from '@webok/core/es6/page'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Datetime, ExternalLink, SectionBlock } from '../common'

@Component({
  components: {
    SectionBlock,
    ExternalLink,
    Datetime,
  },
})
export class PageDetails extends Vue {
  @Prop({ type: Object, required: true })
  private readonly page!: PageDto

  render () {
    return (
      <div>
        <section-block title='Name'>
          <div>{this.page.name}</div>
        </section-block>
        <section-block title='Url'>
          <div><external-link to={this.page.url}/></div>
        </section-block>
        <section-block title='Created At'>
          <div><datetime value={this.page.createdAt}/></div>
        </section-block>
      </div>
    )
  }
}
