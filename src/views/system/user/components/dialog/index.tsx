import React, { useState } from 'react'
import Dialog from './dialog'
import { Button } from 'antd'
import './index.less'

const UseDialog = () => {
  const [isShowDialog, setIsShowDialog] = useState(false)
  const toggleDialog = () => {
    setIsShowDialog(prev => !prev.isShowDialog)
  }
  const closeDialog = () => {
    setIsShowDialog(false)
  }
  const onSure = () => {
    console.log('确定...')
    setTimeout(() => {
      setIsShowDialog(false)
    }, 2000)
  }
  return (
    <div className="p-use-dialog">
      <Button onClick={toggleDialog}>使用弹窗类组件</Button>
      {isShowDialog && (
        <Dialog dialogWidth="80%" onCancel={closeDialog} onOk={onSure} cancelText="残忍离开" sureText="我再想想">
          <div className="dialog-content">具体内容请写在这里...</div>
        </Dialog>
      )}
    </div>
  )
}

export default UseDialog
