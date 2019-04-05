import { Component, Vue } from 'nuxt-property-decorator'
import { MetaInfo } from 'vue-meta'

@Component({})
export default class HomeRoute extends Vue {
  private readonly appName: string = 'WebOK'

  head (): MetaInfo {
    return {
      title: 'Home',
    }
  }

  render () {
    return (
      <div class='ma-3'>
        <h1 class='display-3'>Welcome to {this.appName}!</h1>
        <v-btn color='primary'>Primary</v-btn>
        <v-btn color='secondary'>Secondary</v-btn>
        <v-btn color='accent'>Accent</v-btn>
      </div>
    )
  }
}
