import { useState, useEffect } from 'react'
import { Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import { useStoreSelector } from '@/views/admin/store'
import { routes } from '@/views/admin/router'
import { getMatchRoute, getAllBreadcrumbList } from '@/utils/permission'

const Back = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [showBack, setShowBack] = useState(true)
  const { breadcrumb } = useStoreSelector(state => state.app)

  useEffect(() => {
    setMatchedList()
  }, [pathname])

  const setMatchedList = () => {
    const breadcrumbList = getAllBreadcrumbList(routes)
    const route = getMatchRoute(pathname, routes) || {}
    const matched = route?.path ?? ''
    const matchedList = breadcrumbList[matched]
    if (matchedList?.length > 1) {
      const last = matchedList[matchedList.length - 1]
      setShowBack(!!last?.meta?.hidden)
    }
  }

  const handleBack = () => {
    const lastSecond = breadcrumb[breadcrumb.length - 2]
    navigate(lastSecond.path as string)
  }

  return (
    <>
      {showBack && (
        <Button
          className="back-button"
          type="primary"
          shape="circle"
          size="large"
          icon={<ArrowLeftOutlined />}
          onClick={handleBack}
          title="返回"
        />
      )}
    </>
  )
}

export default Back
