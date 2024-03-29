import { LoadingOutlined } from '@ant-design/icons'
import { Spin, Row, Col } from 'antd'
import { useStoreSelector } from '@/views/admin/store'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

interface LoadingParams {
  height?: string | number
}

/**
 * 正在加载图标
 * @param {LoadingParams} param0
 * @returns
 */
export default function Loading({ height }: LoadingParams) {
  const { theme } = useStoreSelector(state => state.app)
  return (
    <Row
      align="middle"
      justify="center"
      style={{
        height: height || '100vh',
        backgroundColor: theme === 'dark' ? '#fff' : '#000'
      }}
    >
      <Col>
        <Spin indicator={antIcon} tip="加载中..." />
      </Col>
    </Row>
  )
}
