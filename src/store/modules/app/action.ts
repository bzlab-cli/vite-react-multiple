import { AppMutationTypes } from './types'

export const setToken = (token: string) => ({
  type: AppMutationTypes.SET_TOKEN,
  token
})

export const setAssemblySize = (assemblySize: string) => ({
  type: AppMutationTypes.SET_ASSEMBLY_SIZE,
  assemblySize
})
