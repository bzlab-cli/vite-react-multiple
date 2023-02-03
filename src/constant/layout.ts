import type { SearchConfig } from '@ant-design/pro-table/es/components/Form/FormRender'
import type { OptionConfig } from '@ant-design/pro-table/es/components/ToolBar'
import type { TablePaginationConfig } from 'antd/es/table/Table'

export const editCanvasConfig = {
  width: 1920,
  height: 1080,
  previewScaleType: 'full'
}

export const searchConfig: SearchConfig = {
  defaultCollapsed: false,
  labelWidth: 'auto',
  span: {
    xs: 24,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 8,
    xxl: 6
  }
}

export const tableOptions: OptionConfig = {
  density: false,
  setting: {
    listsHeight: 400
  }
}

export const tablePagination: TablePaginationConfig = {
  size: 'default',
  showQuickJumper: true,
  pageSize: 10,
  showTotal: total => `共 ${total} 条`
}
