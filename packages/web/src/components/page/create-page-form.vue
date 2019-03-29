<script lang='tsx'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { CreateElement } from 'vue'
import { CreatePageDto } from '@webok/core/es6/page'
import FormCard from '../common/form-card.vue'

@Component({
  components: {
    FormCard,
  },
})
export default class CreatePageForm extends Vue {
  private readonly createPageDto = new CreatePageDto()

  submit () {
    console.log(this.createPageDto)
  }

  submitIfEnter (event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.submit()
    }
  }

  render (h: CreateElement) {
    return (
      <form-card>
        <div
          slot='title'
          class='headline'
        >Create Page</div>
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
            color='primary'
            on={{ click: this.submit }}
          >Save</v-btn>
        </template>
      </form-card>
    )
  }
}
</script>
