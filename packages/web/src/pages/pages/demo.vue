<script lang='tsx'>
import { Component, Vue } from 'nuxt-property-decorator'
import { CreateElement } from 'vue'
import { MetaInfo } from 'vue-meta'
import { PageDto, CreatePageDto, UpdatePageDto } from '@webok/core/es6/page'
import PageDetails from '../../components/page/page-details.vue'
import PageNewForm from '../../components/page/page-new-form.vue'
import PageEditForm from '../../components/page/page-edit-form.vue'

@Component({
  components: {
    PageDetails,
    PageNewForm,
    PageEditForm,
  },
})
export default class PagesDemoRoute extends Vue {
  private readonly pageDto = new PageDto({ id: 1, name: 'Site1', url: 'https://site1.com', createdAt: '2019-03-18T12:03:15.013Z' })

  head (): MetaInfo {
    return {
      title: 'Pages Demo',
    }
  }

  createPage (createPageDto: CreatePageDto) {
    console.log('createPage', { ...createPageDto })
  }

  updatePage (updatePageDto: UpdatePageDto) {
    console.log('updatePage', { ...updatePageDto })
  }

  render (h: CreateElement) {
    return (
      <div class='ma-3'>
        <div class='display-3'>Pages Demo</div>
        <div class='mb-4'>
          <div class='display-1'>/:pageId</div>
          <page-details page-dto={this.pageDto}/>
        </div>
        <div class='mb-4'>
          <div class='display-1'>/new</div>
          <page-new-form on={{ submit: this.createPage }}/>
        </div>
        <div class='mb-4'>
          <div class='display-1'>/:pageId/edit</div>
          <page-edit-form page-dto={this.pageDto} on={{ submit: this.updatePage }}/>
        </div>
      </div>
    )
  }
}
</script>
