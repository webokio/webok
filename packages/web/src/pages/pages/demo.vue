<script lang='tsx'>
import { Component, Vue } from 'nuxt-property-decorator'
import { CreateElement } from 'vue'
import { MetaInfo } from 'vue-meta'
import { PageDto } from '@webok/core/es6/page'
import PageDetails from '../../components/page/page-details.vue'
import CreatePageForm from '../../components/page/create-page-form.vue'

@Component({
  components: {
    PageDetails,
    CreatePageForm,
  },
})
export default class PagesDemoRoute extends Vue {
  private readonly pageDto = new PageDto({ id: 1, name: 'Site1', url: 'https://site1.com', createdAt: '2019-03-18T12:03:15.013Z' })

  head (): MetaInfo {
    return {
      title: 'Pages Demo',
    }
  }

  render (h: CreateElement) {
    return (
      <div class='ma-3'>
        <div class='display-3'>Pages Demo</div>
        <div class='mb-4'>
          <div class='display-1'>/create</div>
          <create-page-form/>
        </div>
        <div class='mb-4'>
          <div class='display-1'>/show/:pageId</div>
          <page-details page-dto={this.pageDto}/>
        </div>
        {/*<div class='mb-4'>
          <div class='display-1'>/edit/:pageId</div>
          <page-edit-form pageToEdit={this.page}/>
        </div>*/}
      </div>
    )
  }
}
</script>
