import { ElNotification } from 'element-plus'

/**
 * @description 接收数据流生成blob，创建链接，下载文件
 * @param {Function} api 导出表格的api方法
 * @param {String} fileName 导出的文件名
 * @param {Object} params 导出的参数
 * @param {Boolean} isNotify 是否有导出消息提示
 * @param {String} fileType 导出的文件格，默认为.xlsx
 * @return void
 * */
export const useDownload = async (
  api: (param: any) => Promise<any>,
  fileName: string,
  params: any = {},
  isNotify = true,
  fileType = '.xlsx'
) => {
  if (isNotify) {
    ElNotification({
      title: '提示',
      message: '如果数据庞大会导致下载缓慢，请您耐心等待',
      type: 'info',
      duration: 3000
    })
  }
  try {
    const res = await api(params)
    const type = getApplicationType(fileType)
    const blob = new Blob([res], { type })
    if ('msSaveOrOpenBlob' in navigator) return (window.navigator as any).msSaveOrOpenBlob(blob, fileName + fileType)
    const blobUrl = window.URL.createObjectURL(blob)
    const exportFile = document.createElement('a')
    exportFile.style.display = 'none'
    exportFile.download = `${fileName}${fileType}`
    exportFile.href = blobUrl
    document.body.appendChild(exportFile)
    exportFile.click()
    document.body.removeChild(exportFile)
    window.URL.revokeObjectURL(blobUrl)
  } catch (error) {
    console.log(error)
  }
}

function getApplicationType(type) {
  const types = {
    xlsx: 'application/vnd.ms-excel;charset=UTF-8'
  }
  return types[type]
}
