<script lang='tsx'>
import { Component, Vue } from 'vue-property-decorator'
import { CreateElement } from 'vue'

@Component({})
export default class FormCard extends Vue {
  render (h: CreateElement) {
    return (
      <v-card raised>
        <v-card-title
          class='my-2 pb-0'
          primary-title
        >
          {this.$slots.title}
        </v-card-title>
        <v-card-text class='py-0'>
          {this.$slots.default}
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          {this.$slots.actions}
        </v-card-actions>
      </v-card>
    )
  }
}
</script>
