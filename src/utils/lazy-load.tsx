import React, { Suspense } from 'react'
import { Spin } from 'antd'

const modules = import.meta.glob('/src/views/**/*.tsx')

const lazyLoad = (name: string): React.ReactNode => {
  const Components = React.lazy(modules['/src/views/' + name] as any)

  return (
    <Suspense
      fallback={
        <Spin
          size="large"
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        />
      }
    >
      <Components />
    </Suspense>
  )
}

export default lazyLoad
