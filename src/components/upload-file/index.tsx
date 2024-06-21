import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react'
import { Button, message, Image } from 'antd'
import { PlusOutlined, FileTextTwoTone } from '@ant-design/icons'
import { Space } from 'antd'
import BzUpload from '@/components/bz-upload'
import usePreview from '@/views/admin/hooks/use-preview'
import deleteIcon from '@/assets/images/admin/delete.png'

type uploadProps = {
  onGetList: (e) => { e }
  disabled: boolean
  showName?: boolean
  accept?: string
  length?: Number //图片数量
}
interface ImageInter {
  url: string
  name: string
  acceptType: string
}
const imgTypeArr = ['.jpg', '.jpeg', '.png', '.gif', '.bmp']

function extractFileName(path) {
  const regex = /\/([^/]+)$/ // 匹配最后一个斜杠后的内容作为文件名
  const matches = path.match(regex)
  if (matches && matches.length > 1) {
    return matches[1]
  }
  return ''
}

const imageBox = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  width: '102px',
  height: '102px',
  background: '#FFFFFF',
  border: '1px solid #D9D9D9',
  borderRadius: '8px'
}
const deleteIconStyle = {
  position: 'absolute',
  zIndex: '99',
  width: '30px',
  height: '30px',
  top: '-14px',
  right: '-11px'
}
const uploadImage = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '102px',
  height: '102px',
  background: '#FAFAFA',
  border: '1px solid #D9D9D9',
  borderRadius: '8px'
}
const name = {
  width: '102px',
  display: 'inline-block',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textAlign: 'center',
  textOverflow: 'ellipsis',
  fontSize: '16px',
  fontFamily: 'Microsoft YaHei',
  fontWeight: '400',
  color: '#4C4C4C'
}
const UpLoad: React.ForwardRefRenderFunction<unknown, uploadProps> = (
  { length = 9, accept = '', disabled, onGetList, showName = false }: uploadProps,
  ref
) => {
  const [imageList, setImageList] = useState<ImageInter[]>([])
  // const { onChange } = props
  console.log('w s disabled123213', disabled)
  function onSuccess(e: any, file) {
    const newImageList = [...imageList]
    newImageList.push({ url: e?.url, name: file.name, acceptType: file.raw.fileType })
    setImageList(newImageList)
    onGetList(newImageList)
  }
  function beforeUpload(file) {
    if (!accept) return true
    const acceptArr = accept.split(',').map(extension => extension.trim())
    console.log('acceptArr', acceptArr)
    if (!acceptArr.includes(file.fileType.toLowerCase())) {
      message.warning(`请上传${accept}格式的文件`)
      return false
    }
  }
  const handleDeletePhoto = index => {
    // 删除指定索引的照片
    const newImageList: ImageInter[] = [...imageList]
    newImageList.splice(index, 1)
    setImageList(newImageList)
    onGetList(newImageList)
  }
  useImperativeHandle(ref, () => {
    // 需要将暴露的接口返回出去
    return {
      setImageList,
      imageList
    }
  })
  useEffect(() => {
    console.log('我进来了')
    // 获取元素
    setTimeout(() => {
      const inputElement: any = document.querySelector('.bz-upload__input')
      //设置样式
      inputElement && (inputElement.style.position = 'absolute')
      inputElement && (inputElement.style.left = '999999px')
    }, 0)
  }, [imageList])
  return (
    <Space size={20} align={'start'}>
      {imageList.map((item, index) => {
        return (
          <div key={item.url + index}>
            <div style={imageBox}>
              {disabled ? null : (
                <img onClick={() => handleDeletePhoto(index)} style={deleteIconStyle} src={deleteIcon} alt="" />
              )}
              {imgTypeArr.includes(item.acceptType.toLowerCase()) ? (
                <Image width={'100%'} height={'100%'} src={item.url} />
              ) : (
                <Button
                  icon={<FileTextTwoTone style={{ fontSize: 25 }} />}
                  onClick={() => usePreview(item.url)}
                  size={'large'}
                  type="text"
                />
              )}
            </div>
            <div style={name}>{showName ? extractFileName(item.url) : ''}</div>
          </div>
        )
      })}
      {imageList.length >= length || disabled ? null : (
        <BzUpload beforeUpload={beforeUpload} accept={accept} onSuccess={onSuccess}>
          <div>
            <div style={uploadImage}>
              <Button icon={<PlusOutlined style={{ fontSize: 25 }} />} type="text" />
            </div>
          </div>
        </BzUpload>
      )}
    </Space>
  )
}

export default forwardRef(UpLoad)
