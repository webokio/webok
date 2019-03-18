<script lang='tsx'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { CreateElement } from 'vue'
import { IPage } from '@webok/core/lib/page'
import ExternalLink from '../common/external-link.vue'
import Datetime from '../common/datetime.vue'

@Component({
  components: {
    ExternalLink,
    Datetime,
  },
})
export default class PageDetails extends Vue {
  @Prop({ type: Object, required: true }) readonly page!: IPage

  render (h: CreateElement) {
    return (
      <div>
        <div class='mb-2'>
          <strong>Name</strong>
          <div>{this.page.name}</div>
        </div>
        <div class='mb-2'>
          <strong>Url</strong>
          <div><external-link to={this.page.url}/></div>
        </div>
        <div class='mb-2'>
          <strong>Created at</strong>
          <div><datetime value={this.page.createdAt}/></div>
        </div>
      </div>
    )
  }
}
</script>
