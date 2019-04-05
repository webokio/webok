import { Component, Vue, Prop } from 'vue-property-decorator'
import { DateTime } from 'luxon'

@Component({})
export class Datetime extends Vue {
  @Prop({ type: String, required: true })
  private readonly value!: string

  @Prop({ type: Boolean, default: false })
  private readonly dateOnly!: string

  private get formattedValue () {
    const format = this.dateOnly ? DateTime.DATE_MED : DateTime.DATETIME_MED
    return DateTime.fromISO(this.value).setLocale('en-US').toLocaleString(format)
  }

  render () {
    return (
      // Use no-ssr because server does not know client timezone
      <no-ssr>
        <time datetime={this.value}>{this.formattedValue}</time>
        <span slot='placeholder'>&nbsp;</span>
      </no-ssr>
    )
  }
}
