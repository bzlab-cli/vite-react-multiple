// import { NamePath } from 'rc-field-form/lib/interface'
import React from 'react'
import ReactDOM from 'react-dom'
// import FormModal, { FormModalProps } from './form-modal'
// import { Form, Input, FormItemProps } from 'antd'

export type PromptProp = Omit<FormModalProps, 'onOk' | 'children'> & {
  // onOk?: (value: T) => Promise<any>
  // name?: NamePath
  // label?: React.ReactNode
  // required?: boolean
  // initialValue?: T
  // formItemProps?: FormItemProps
  children?: React.ReactNode
}

type PromptFunctions = {
  prompt: (props: PromptProp) => Promise<any>
}

// const defaultChildren = <Input autoComplete="false" autoFocus allowClear />

const Prompt: PromptFunctions = ({ children }) => {
  return { children }
}

Prompt.prompt = async props => {
  const { visible, onCancel, onOk, ...otherPromptProps } = props
  const afterClose = otherPromptProps?.modalProps?.afterClose
  return new Promise((resolve, reject) => {
    const container = document.createDocumentFragment()
    const destroy = () => {
      ReactDOM.unmountComponentAtNode(container)
      afterClose?.()
    }
    const handleCancel = async () => {
      await onCancel?.()
      reject()
      setTimeout(() => {
        destroy()
      })
    }
    const handleOk = async value => {
      await onOk?.(value)
      resolve(value)
      setTimeout(() => {
        destroy()
      })
    }
    ReactDOM.render(
      <Prompt visible={visible} onOk={handleOk} onCancel={handleCancel} {...otherPromptProps} />,
      container
    )
  })
}

export default Prompt
