<script lang='tsx'>
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { CreateElement } from 'vue'
import { PageDto, UpdatePageDto } from '@webok/core/es6/page'
import FormCard from '../common/form-card.vue'

@Component<PageEditForm>({
  components: {
    FormCard,
  },
  data () {
    const { url, name } = this.pageDto
    const updatePageDto: UpdatePageDto = { url, name }
    return {
      updatePageDto,
    }
  }
})
export default class PageEditForm extends Vue {
  @Prop({ type: Object, required: true })
  private readonly pageDto!: PageDto

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

  render (h: CreateElement) {
    return (
      <form-card>
        <div
          slot='title'
          class='headline'
        >Edit Page</div>
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
          >Cancel</v-btn>
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
