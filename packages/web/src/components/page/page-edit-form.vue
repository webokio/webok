<script lang='tsx'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { CreateElement } from 'vue'
import { IPage } from '@webok/core/lib/page'

@Component({
  components: {},
})
export default class PageEditForm extends Vue {
  @Prop(Object) readonly pageToEdit?: IPage

  submit () {
    console.log(this.pageToEdit)
  }

  render (h: CreateElement) {
    return (
      <div>
        <v-form
          class='pt-3'
          on={{ 'keyup.native.enter': this.submit }}
        >
          <v-btn
            color='primary'
            on={{ click: this.submit }}
          >Save</v-btn>
        </v-form>
      </div>
    )
  }
}
</script>
