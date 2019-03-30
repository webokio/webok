<script lang='tsx'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { CreateElement } from 'vue'

@Component({})
export default class SectionBlock extends Vue {
  @Prop({ type: String, required: true })
  private readonly title!: string

  render (h: CreateElement) {
    return (
      <div class='my-2'>
        <strong>{this.title}</strong>
        {this.$slots.default}
      </div>
    )
  }
}
</script>
