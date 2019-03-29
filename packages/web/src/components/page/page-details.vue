<script lang='tsx'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { CreateElement } from 'vue'
import { PageDto } from '@webok/core/es6/page'
import FieldSection from '../common/field-section.vue'
import FieldLabel from '../common/field-label.vue'
import ExternalLink from '../common/external-link.vue'
import Datetime from '../common/datetime.vue'

@Component({
  components: {
    FieldSection,
    FieldLabel,
    ExternalLink,
    Datetime,
  },
})
export default class PageDetails extends Vue {
  @Prop({ type: Object, required: true })
  private readonly pageDto!: PageDto

  render (h: CreateElement) {
    return (
      <div>
        <field-section>
          <field-label>Name</field-label>
          <div>{this.pageDto.name}</div>
        </field-section>
        <field-section>
          <field-label>Url</field-label>
          <div><external-link to={this.pageDto.url}/></div>
        </field-section>
        <field-section>
          <field-label>Created at</field-label>
          <div><datetime value={this.pageDto.createdAt}/></div>
        </field-section>
      </div>
    )
  }
}
</script>
