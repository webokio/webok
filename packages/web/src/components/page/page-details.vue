<script lang='tsx'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { CreateElement } from 'vue'
import { PageDto } from '@webok/core/es6/page'
import SectionBlock from '../common/section-block.vue'
import ExternalLink from '../common/external-link.vue'
import Datetime from '../common/datetime.vue'

@Component({
  components: {
    SectionBlock,
    ExternalLink,
    Datetime,
  },
})
export default class PageDetails extends Vue {
  @Prop({ type: Object, required: true })
  private readonly pageDto!: PageDto

  render (h: CreateElement) {
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
</script>
