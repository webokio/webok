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
  private readonly page: IPage = { id: 1, name: 'Site1', url: 'https://site1.com', createdAt: '2019-03-11T11:07:48.969Z' }

  head (): MetaInfo {
    return {
      title: 'Pages demo',
    }
  }

  render (h: CreateElement) {
    return (
      <div class='ma-3'>
        <h1 class='display-3'>Pages demo</h1>
        <page-details page={this.page}/>
      </div>
    )
  }
}
</script>
