<script lang='tsx'>
import { Component, Vue } from 'vue-property-decorator'
import { CreateElement } from 'vue'

@Component({})
export default class FieldSection extends Vue {
  render (h: CreateElement) {
    return (
      <strong>
        {this.$slots.default}
      </strong>
    )
  }
}
</script>
