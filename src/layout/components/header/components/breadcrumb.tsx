import { Breadcrumb } from 'antd'
import Link from './link'
import { useStoreSelector } from '@/store'

const LayoutBreadcrumb = () => {
  const { breadcrumb } = useStoreSelector(state => state.app)
  return breadcrumb.length > 0 ? (
    <Breadcrumb separator=">">
      {breadcrumb.map((item: any, index) => {
        if (item.redirect === 'noredirect' || index === breadcrumb.length - 1) {
          return <Breadcrumb.Item key={index}>{item.meta.title}</Breadcrumb.Item>
        }
        return (
          <Breadcrumb.Item key={index}>
            <Link to={item.path}>{item.meta.title}</Link>
          </Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
  ) : (
    <div style={{ height: 16 }} />
  )
}

export default LayoutBreadcrumb
