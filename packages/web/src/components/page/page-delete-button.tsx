import { PageDto } from '@webok/core/es6/page'
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import { FormCard } from '../common'

@Component({
  components: {
    FormCard,
  },
})
export class PageDeleteButton extends Vue {
  @Prop({ type: Object, required: true })
  private readonly page!: PageDto

  private deletingPage: boolean = false

  private setDeletingPage (deletingPage: boolean) {
    this.deletingPage = deletingPage
  }

  @Emit('submit')
  private submit () {
    this.deletingPage = false
    return this.page
  }

  @Emit('cancel')
  private cancel () {
    this.deletingPage = false
  }

  render () {
    return (
      <v-dialog
        value={this.deletingPage}
        width='50%'
        on={{ input: this.setDeletingPage }}
      >
        <v-btn
          slot='activator'
          color='error'
          flat
        >
          Delete
        </v-btn>
        <form-card>
          <div
            slot='title'
            class='headline'
          >
            Delete Page
          </div>
          <p class='subheading mt-3'>
            Are you sure you want to delete the page '{this.page.name}'?
          </p>
          <template slot='actions'>
            <v-btn
              flat
              on={{ click: this.cancel }}
            >
              Cancel
            </v-btn>
            <v-btn
              color='error'
              on={{ click: this.submit }}
            >
              Delete
            </v-btn>
          </template>
        </form-card>
      </v-dialog>
    )
  }
}
