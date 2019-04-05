import { Component, Vue } from 'vue-property-decorator'

@Component({})
export class FormCard extends Vue {
  render () {
    return (
      <v-card raised>
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
