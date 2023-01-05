import { Breadcrumb } from 'antd'
// import { useLocation } from 'react-router-dom'

const BreadcrumbNav = () => {
  // const { pathname } = useLocation()
  // const { themeConfig } = props.global
  // const breadcrumbList = props.breadcrumb.breadcrumbList[pathname] || []

  const breadcrumbList = []

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href={`#/`}>首页</Breadcrumb.Item>
        {breadcrumbList.map((item: string) => {
          return <Breadcrumb.Item key={item}>{item !== '首页' ? item : null}</Breadcrumb.Item>
        })}
      </Breadcrumb>
    </>
  )
}

export default BreadcrumbNav
