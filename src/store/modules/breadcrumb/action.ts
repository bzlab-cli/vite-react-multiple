import { BreadcrumbMutationTypes } from './types'

export const setBreadcrumbList = (breadcrumbList: { [propName: string]: any }) => ({
  type: BreadcrumbMutationTypes.SET_BREADCRUMB_LIST,
  breadcrumbList
})
