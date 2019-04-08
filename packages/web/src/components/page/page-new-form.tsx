import { CreatePageDto } from '@webok/core/es6/page'
import { Component, Emit, Vue } from 'vue-property-decorator'
import { FormCard } from '../common'

@Component({
  components: {
    FormCard,
  },
})
export class PageNewForm extends Vue {
  private readonly createPageDto = new CreatePageDto()

  @Emit('submit')
  private submit () {
    return this.createPageDto
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
          New Page
        </div>
        <v-form
          class='pt-3'
          nativeOn={{ keyup: this.submitIfEnter }}
        >
          <v-text-field
            v-model={this.createPageDto.name}
            label='Name'
          />
          <v-text-field
            v-model={this.createPageDto.url}
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
