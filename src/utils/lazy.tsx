/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Suspense } from 'react'
import { Spin } from 'antd'

/**
 * @description 路由懒加载
 * @param {Element} Component 组件
 * @returns element
 */
export const LazyComponent = ({ element: Component, ...props }: any) => {
  return (
    <Suspense
      fallback={
        <Spin
          size="large"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
          }}
        />
      }
    >
      <Spin
        size="large"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%'
        }}
      />
      {/* <Component {...props} /> */}
    </Suspense>
  )
}
