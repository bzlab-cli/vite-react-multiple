import { AnyAction } from 'redux'
import produce from 'immer'
import type { SizeType } from 'antd/lib/config-provider/SizeContext'
import { AppMutationTypes } from './types'

export interface GlobalState {
  token: string
  userInfo: any
  assemblySize: SizeType
  language: string
}

const globalState: GlobalState = {
  token: '',
  userInfo: '',
  assemblySize: 'middle',
  language: 'zh'
}

const global = (state: GlobalState = globalState, action: AnyAction) =>
  produce(state, state => {
    switch (action.type) {
      case AppMutationTypes.SET_TOKEN:
        state.token = action.token
        break
      case AppMutationTypes.SET_ASSEMBLY_SIZE:
        state.assemblySize = action.assemblySize
        break
      default:
        return state
    }
  })

export default global
