<template>
  <h1>Welcome to {{ this.appName }}!</h1>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class HomePage extends Vue {
  appName: string = 'WebOK'
}
</script>
