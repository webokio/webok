import { CreateAuthDto } from '@webok/core/es6/auth'
import { Component, Emit, Vue } from 'vue-property-decorator'
import { FormCard } from '../common'

@Component({
  components: {
    FormCard,
  },
})
export class LoginForm extends Vue {
  private readonly createAuthDto = new CreateAuthDto()

  @Emit('submit')
  private submit () {
    return this.createAuthDto
  }

  private submitIfEnter (event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.submit()
    }
  }

  @Emit('cancel')
  private cancel () {}

  render () {
    return (
      <form-card>
        <div
          slot='title'
          class='headline'
        >
          Log In
        </div>
        <v-form
          class='pt-3'
          nativeOn={{ keyup: this.submitIfEnter }}
        >
          <v-text-field
            v-model={this.createAuthDto.email}
            label='Email'
          />
          <v-text-field
            v-model={this.createAuthDto.password}
            type='password'
            label='Password'
          />
        </v-form>
        <template slot='actions'>
          <v-btn
            flat
            on={{ click: this.cancel }}
          >
            Cancel
          </v-btn>
          <v-btn
            color='primary'
            on={{ click: this.submit }}
          >
            Log In
          </v-btn>
        </template>
      </form-card>
    )
  }
}
