import { CreateAuthDto } from '@webok/core/es6/auth'
import { CreateUserDto } from '@webok/core/es6/user'
import { Component, Vue } from 'nuxt-property-decorator'
import { MetaInfo } from 'vue-meta'
import { LoginForm, SignupForm } from '../../components/auth'

@Component({
  components: {
    LoginForm,
    SignupForm,
  },
})
export default class AuthDemoRoute extends Vue {
  head (): MetaInfo {
    return {
      title: 'Auth Demo',
    }
  }

  private login (createAuthDto: CreateAuthDto) {
    console.log('login', { ...createAuthDto })
  }

  private signup (createUserDto: CreateUserDto) {
    console.log('signup', { ...createUserDto })
  }

  private cancel () {
    console.log('cancel')
  }

  render () {
    return (
      <div class='ma-3'>
        <div class='display-3 mb-4'>Auth Demo</div>
        <div class='mb-4'>
          <div class='display-1'>/login</div>
          <login-form
            class='mt-2'
            on={{
              submit: this.login,
              cancel: this.cancel,
            }}
          />
        </div>
        <div class='mb-4'>
          <div class='display-1'>/signup</div>
          <signup-form
            class='mt-2'
            on={{
              submit: this.signup,
              cancel: this.cancel,
            }}
          />
        </div>
      </div>
    )
  }
}
