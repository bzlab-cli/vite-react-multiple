import { Breadcrumb } from 'antd'
import Link from './link'
import { useStoreSelector } from '@/views/admin/store'

const LayoutBreadcrumb = () => {
  const { breadcrumb } = useStoreSelector(state => state.app)
  const items = breadcrumb.map((item: any) => item)

  function itemRender(item, params, items) {
    const last = item.redirect === 'noredirect' || items.indexOf(item) === items.length - 1
    return last ? <span>{item.meta.title}</span> : <Link to={item.path}>{item.meta.title}</Link>
  }

  return breadcrumb.length > 0 ? (
    <Breadcrumb separator=">" itemRender={itemRender} items={items} />
  ) : (
    <div style={{ height: 16 }} />
  )
}

export default LayoutBreadcrumb
