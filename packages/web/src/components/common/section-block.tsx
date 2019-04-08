import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export class SectionBlock extends Vue {
  @Prop({ type: String, required: true })
  private readonly title!: string

  render () {
    return (
      <div class='my-2'>
        <strong>{this.title}</strong>
        {this.$slots.default}
      </div>
    )
  }
}
