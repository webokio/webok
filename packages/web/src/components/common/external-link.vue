<script lang='tsx'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { CreateElement } from 'vue'

@Component({})
export default class ExternalLink extends Vue {
  @Prop({ type: String, required: true }) readonly to!: string
  @Prop(String) readonly label!: string

  render (h: CreateElement) {
    return (
      <a
        href={this.to}
        class='link'
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
</script>

<style lang="scss" scoped>
.link {
  text-decoration: none;
}
</style>
