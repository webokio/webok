import { Component, Vue, Prop } from 'vue-property-decorator'
import { PageDto } from '@webok/core/es6/page'
import { SectionBlock, ExternalLink, Datetime } from '../common'

@Component({
  components: {
    SectionBlock,
    ExternalLink,
    Datetime,
  },
})
export class PageDetails extends Vue {
  @Prop({ type: Object, required: true })
  private readonly pageDto!: PageDto

  render () {
    return (
      <div>
        <section-block title='Name'>
          <div>{this.pageDto.name}</div>
        </section-block>
        <section-block title='Url'>
          <div><external-link to={this.pageDto.url}/></div>
        </section-block>
        <section-block title='Created At'>
          <div><datetime value={this.pageDto.createdAt}/></div>
        </section-block>
      </div>
    )
  }
}
