import { Component, Vue } from 'nuxt-property-decorator'
import { MetaInfo } from 'vue-meta'
import { getStyles } from 'typestyle'

@Component({})
export default class DefaultLayout extends Vue {
  head (): MetaInfo {
    return {
      style: [
        { cssText: getStyles(), type: 'text/css' },
      ],
    }
  }

  render () {
    return (
      <v-app>
        <nuxt/>
      </v-app>
    )
  }
}
