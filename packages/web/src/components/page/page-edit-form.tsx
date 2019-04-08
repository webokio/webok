import { PageDto, UpdatePageDto } from '@webok/core/es6/page'
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import { FormCard } from '../common'

@Component<PageEditForm>({
  components: {
    FormCard,
  },
  data () {
    const { url, name } = this.page
    const updatePageDto: UpdatePageDto = { url, name }
    return {
      updatePageDto,
    }
  },
})
export class PageEditForm extends Vue {
  @Prop({ type: Object, required: true })
  private readonly page!: PageDto

  private readonly updatePageDto!: UpdatePageDto

  @Emit('submit')
  private submit () {
    return this.updatePageDto
  }

  private submitIfEnter (event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.submit()
    }
  }

  @Emit('cancel')
  private cancel () {}

  render () {
    return (
      <form-card>
        <div
          slot='title'
          class='headline'
        >
          Edit Page
        </div>
        <v-form
          class='pt-3'
          nativeOn={{ keyup: this.submitIfEnter }}
        >
          <v-text-field
            v-model={this.updatePageDto.name}
            label='Name'
          />
          <v-text-field
            v-model={this.updatePageDto.url}
            label='Url'
          />
        </v-form>
        <template slot='actions'>
          <v-btn
            flat
            on={{ click: this.cancel }}
          >
            Cancel
          </v-btn>
          <v-btn
            color='primary'
            on={{ click: this.submit }}
          >
            Save
          </v-btn>
        </template>
      </form-card>
    )
  }
}
