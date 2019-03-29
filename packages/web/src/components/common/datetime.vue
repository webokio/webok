<script lang='tsx'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { CreateElement } from 'vue'
import { DateTime } from 'luxon'

@Component({})
export default class Datetime extends Vue {
  @Prop({ type: String, required: true })
  private readonly value!: string

  @Prop({ type: Boolean, default: false })
  private readonly dateOnly!: string

  get formattedValue () {
    const format = this.dateOnly ? DateTime.DATE_MED : DateTime.DATETIME_MED
    return DateTime.fromISO(this.value).setLocale('en-US').toLocaleString(format)
  }

  render (h: CreateElement) {
    return (
      // Use no-ssr because server does not know client timezone
      <no-ssr>
        <time datetime={this.value}>{this.formattedValue}</time>
        <span slot='placeholder'>&nbsp;</span>
      </no-ssr>
    )
  }
}
</script>
