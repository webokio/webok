<template>
  <h1 class="blue">Welcome to {{ appName }}!</h1>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class HomePage extends Vue {
  appName: string = 'WebOK'
}
</script>

<style lang="scss" scoped>
.blue {
  color: blue;
}
</style>
