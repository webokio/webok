<script lang="tsx">
import { Component, Vue } from 'nuxt-property-decorator'
import { CreateElement } from 'vue'
import { MetaInfo } from 'vue-meta'
import { IPage } from '@webok/core/lib/page'
import PageDetails from '../../components/page/page-details.vue'

@Component({
  components: {
    PageDetails,
  },
})
export default class PagesDemoRoute extends Vue {
  private readonly page: IPage = { id: 1, name: 'Site1', url: 'https://site1.com', createdAt: '2019-03-18T12:03:15.013Z' }

  head (): MetaInfo {
    return {
      title: 'Pages demo',
    }
  }

  render (h: CreateElement) {
    return (
      <div class='ma-3'>
        <div class='display-3'>Pages demo</div>
        <div class='display-1'>Page details</div>
        <page-details page={this.page}/>
      </div>
    )
  }
}
</script>
