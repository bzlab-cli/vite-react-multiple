import { AuthMutationTypes } from './types'

export const setAuthButtons = (authButtons: { [propName: string]: any }) => ({
  type: AuthMutationTypes.SET_AUTH_BUTTONS,
  authButtons
})

export const setAuthRouter = (authRouter: string[]) => ({
  type: AuthMutationTypes.SET_AUTH_ROUTER,
  authRouter
})
