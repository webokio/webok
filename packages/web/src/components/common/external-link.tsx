import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export class ExternalLink extends Vue {
  @Prop({ type: String, required: true })
  private readonly to!: string

  @Prop(String)
  private readonly label!: string

  render () {
    return (
      <a
        href={this.to}
        class='no-underline'
        target='_blank'
      >
        <v-icon
          color='primary'
          small
        >fas fa-external-link-alt fa-fw</v-icon> {this.label || this.to}
      </a>
    )
  }
}
