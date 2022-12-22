import { AnyAction } from 'redux'
import produce from 'immer'
import { AuthMutationTypes } from './types'

export interface AuthState {
  authButtons: {
    [propName: string]: any
  }
  authRouter: string[]
}

const authState: AuthState = {
  authButtons: {},
  authRouter: []
}

const auth = (state: AuthState = authState, action: AnyAction) =>
  produce(state, state => {
    switch (action.type) {
      case AuthMutationTypes.SET_AUTH_BUTTONS:
        state.authButtons = action.authButtons
        break
      case AuthMutationTypes.SET_AUTH_ROUTER:
        state.authRouter = action.authRouter
        break
      default:
        return state
    }
  })

export default auth
