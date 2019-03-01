<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import { CreateElement } from 'vue'

@Component({})
export default class HomePage extends Vue {
  appName: string = 'WebOK'

  render (h: CreateElement) {
    return (
      <h1 class='blue'>Welcome to {this.appName}!</h1>
    )
  }
}
</script>

<style lang="scss" scoped>
.blue {
  color: blue;
}
</style>
