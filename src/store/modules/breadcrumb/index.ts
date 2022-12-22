import { AnyAction } from 'redux'
import produce from 'immer'
import { BreadcrumbMutationTypes } from './types'

export interface BreadcrumbState {
  breadcrumbList: {
    [propName: string]: any
  }
}

const breadcrumbState: BreadcrumbState = {
  breadcrumbList: {}
}

const breadcrumb = (state: BreadcrumbState = breadcrumbState, action: AnyAction) =>
  produce(state, state => {
    switch (action.type) {
      case BreadcrumbMutationTypes.SET_BREADCRUMB_LIST:
        state.breadcrumbList = action.breadcrumbList
        break
      default:
        return state
    }
  })

export default breadcrumb
