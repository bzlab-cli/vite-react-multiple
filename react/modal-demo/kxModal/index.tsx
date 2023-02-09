import React, { forwardRef, useEffect, useState } from 'react'
import styles from './index.module.less'
import close from '../../assets/images/close.png'
import classNames from 'classnames'
import { ReactNode } from 'react'
import { createPortal } from 'react-dom'

type KxModalProps = {
  title?: string
  visible: boolean
  onCancel?: (boo: boolean) => void
  className?: string
  style?: React.CSSProperties
  children: ReactNode
}

const KxModal = forwardRef((props: KxModalProps, ref: any) => {
  const { title, visible, onCancel, children, className, style } = props

  // if (!visible) return null; //打开没有动画

  return createPortal(
    <div
      ref={ref}
      className={classNames(styles.modalWrap, visible ? styles.visible : styles.hidden, className)}
      style={{ ...style }}
    >
      <div className={styles.titleWrap}>
        <div className="titletext">{title}</div>
        <img className={styles.close} src={close} alt="" onClick={() => onCancel!(false)} />
      </div>
      {children}
    </div>,
    document.body
  )
})
export { KxModal }
