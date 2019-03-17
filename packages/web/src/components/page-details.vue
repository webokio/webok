<script lang='tsx'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { CreateElement } from 'vue'
import { IPage } from '@webok/core/lib/page'

@Component({})
export default class PageDetails extends Vue {
  @Prop(Object) readonly page !: IPage

  render (h: CreateElement) {
    return (
      <div>
        <div class='mb-2'>
          <strong>Name</strong>
          <div>{this.page.name}</div>
        </div>
        <div class='mb-2'>
          <strong>Url</strong>
          <div>{this.page.url}</div>
        </div>
        <div class='mb-2'>
          <strong>Created at</strong>
          <div>{this.page.createdAt}</div>
        </div>
      </div>
    )
  }
}
</script>
