import React from 'react'
import { Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

type uploadProps = {
  value?: {
    key: string
    label: string
  }[]
  onChange: (res) => void
}

const BzUpload: React.FC<uploadProps> = (props: uploadProps) => {
  const attachments = props.value
  const { onChange } = props

  const action = `/file/upload`
  const changeFile = ({ file, fileList }) => {
    if (file.status !== 'uploading') {
      const arr: any[] = []
      fileList.forEach((item: any) => {
        if (item.response) {
          arr.push({
            name: item.name,
            id: item.response.data
          })
        } else {
          arr.push(item)
        }
      })
      onChange(arr)
    }
  }

  return (
    <Upload action={action} onChange={changeFile} defaultFileList={attachments}>
      <Button icon={<UploadOutlined />} type="text" />
    </Upload>
  )
}

export default BzUpload
