import { CreatePageDto, PageDto, UpdatePageDto } from '@webok/core/es6/page'
import { UserDto } from '@webok/core/es6/user'
import { Component, Vue } from 'nuxt-property-decorator'
import { MetaInfo } from 'vue-meta'
import { PageDeleteButton, PageDetails, PageEditForm, PageList, PageNewForm } from '../../components/page'

const owner = new UserDto({
  id: 1,
  name: 'User 1',
  email: 'user1@gmail.com',
})

@Component({
  components: {
    PageList,
    PageDetails,
    PageNewForm,
    PageEditForm,
    PageDeleteButton,
  },
})
export default class PagesDemoRoute extends Vue {
  private readonly page1 = new PageDto({ id: 1, owner, name: 'Site1', url: 'https://site1.com', createdAt: '2019-03-18T12:03:15.013Z' })
  private readonly page2 = new PageDto({ id: 2, owner, name: 'Site2', url: 'https://site2.com', createdAt: '2019-03-19T12:03:15.013Z' })

  head (): MetaInfo {
    return {
      title: 'Pages Demo',
    }
  }

  private createPage (createPageDto: CreatePageDto) {
    console.log('create', { ...createPageDto })
  }

  private updatePage (updatePageDto: UpdatePageDto) {
    console.log('update', { ...updatePageDto })
  }

  private deletePage (page: PageDto) {
    console.log('delete', { ...page })
  }

  private cancel () {
    console.log('cancel')
  }

  render () {
    return (
      <div class='ma-3'>
        <div class='display-3 mb-4'>Pages Demo</div>
        <div class='mb-4'>
          <div class='display-1'>/</div>
          <page-list pages={[this.page1, this.page2]}/>
        </div>
        <div class='mb-4'>
          <div class='display-1'>/:pageId</div>
          <page-details page={this.page1}/>
          <page-delete-button
            page={this.page1}
            on={{
              submit: this.deletePage,
              cancel: this.cancel,
            }}
          />
        </div>
        <div class='mb-4'>
          <div class='display-1'>/new</div>
          <page-new-form
            class='mt-2'
            on={{
              submit: this.createPage,
              cancel: this.cancel,
            }}
          />
        </div>
        <div class='mb-4'>
          <div class='display-1'>/:pageId/edit</div>
          <page-edit-form
            page={this.page1}
            class='mt-2'
            on={{
              submit: this.updatePage,
              cancel: this.cancel,
            }}
          />
        </div>
      </div>
    )
  }
}
