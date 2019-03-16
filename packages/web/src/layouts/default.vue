<script lang="tsx">
import { Component, Vue } from 'nuxt-property-decorator'
import { CreateElement } from 'vue'

@Component({})
export default class DefaultLayout extends Vue {
  render (h: CreateElement) {
    return (
      <v-app>
        <nuxt/>
      </v-app>
    )
  }
}
</script>
