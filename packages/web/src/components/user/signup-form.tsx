import { CreateUserDto } from '@webok/core/es6/user'
import { Component, Emit, Vue } from 'vue-property-decorator'
import { FormCard } from '../common'

@Component({
  components: {
    FormCard,
  },
})
export class SignupForm extends Vue {
  private readonly createUserDto = new CreateUserDto()

  @Emit('submit')
  private submit () {
    return this.createUserDto
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
          Sign Up
        </div>
        <v-form
          class='pt-3'
          nativeOn={{ keyup: this.submitIfEnter }}
        >
          <v-text-field
            v-model={this.createUserDto.name}
            label='Name'
          />
          <v-text-field
            v-model={this.createUserDto.email}
            label='Email'
          />
          <v-text-field
            v-model={this.createUserDto.password}
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
            Sign Up
          </v-btn>
        </template>
      </form-card>
    )
  }
}
