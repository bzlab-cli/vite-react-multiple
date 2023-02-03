/*
 * @Descripttion:
 * @version:
 * @Author: daping
 * @Date: 2021-04-11 18:48:54
 * @LastEditors: jrucker
 * @LastEditTime: 2023/02/01 22:48:48
 */
import React from 'react'
import { Modal } from 'antd-mobile'
import ReactDOM from 'react-dom'
import { Action } from 'antd-mobile/lib/modal/PropsType'

const stopMove = (e: any) => e.preventDefault()

export default function prompt(
  title: React.ReactNode,
  content: React.ReactNode,
  actions = [
    { text: '取消' },
    {
      text: 'ok',
      onPress: () => {
        console.log('ok')
      }
    }
  ]
) {
  const div = document.createElement('div')
  const close = function () {
    ReactDOM.unmountComponentAtNode(div)
    div.remove()
    document.body.removeEventListener('touchmove', stopMove)
  }

  const handleRef = (e: HTMLInputElement) => setTimeout(() => e && e.focus(), 500)

  document.body.appendChild(div)

  const footer = actions.map((button: Action<React.CSSProperties>) => {
    const oldOnPress = button.onPress || (() => {})
    button.onPress = () => {
      const res = oldOnPress()
      if (res && res.then) {
        res.then(close).catch(() => {})
      } else close()
    }
    return button
  })

  document.body.addEventListener('touchmove', stopMove, { passive: false })
  ReactDOM.render(
    <Modal visible={true} transparent={true} title={title} closable={false} maskClosable={false} footer={footer}>
      {content}
      <div className="am-modal-input-container">
        <div className="am-modal-input">
          <input ref={node => handleRef(node as HTMLInputElement)} type="text" />
        </div>
      </div>
    </Modal>,
    div
  )
}

// prompt('title', '你多大了？')
