<script lang='tsx'>
import { Component, Vue } from 'vue-property-decorator'
import { CreateElement } from 'vue'

@Component({})
export default class FormCard extends Vue {
  render (h: CreateElement) {
    return (
      <v-card
        class="mt-2"
        raised
      >
        <v-card-title
          class='pb-0'
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
