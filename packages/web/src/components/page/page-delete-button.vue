<script lang='tsx'>
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { CreateElement } from 'vue'
import { PageDto } from '@webok/core/es6/page'
import FormCard from '../common/form-card.vue'

@Component({
  components: {
    FormCard,
  },
})
export default class PageDeleteButton extends Vue {
  @Prop({ type: Object, required: true })
  private readonly pageDto!: PageDto

  private deletingPage: boolean = false

  private setDeletingPage (deletingPage: boolean) {
    this.deletingPage = deletingPage
  }

  @Emit('submit')
  private submit () {
    this.deletingPage = false
    return this.pageDto
  }

  @Emit('cancel')
  private cancel () {
    this.deletingPage = false
  }

  render (h: CreateElement) {
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
        >Delete</v-btn>
        <form-card>
          <div
            slot='title'
            class='headline'
          >Delete Page</div>
          <p class="subheading mt-3">
            Are you sure you want to delete the page '{this.pageDto.name}'?
          </p>
          <template slot='actions'>
          <v-btn
            flat
            on={{ click: this.cancel }}
          >Cancel</v-btn>
          <v-btn
            color='error'
            on={{ click: this.submit }}
          >Delete</v-btn>
        </template>
        </form-card>
      </v-dialog>
    )
  }
}
</script>
