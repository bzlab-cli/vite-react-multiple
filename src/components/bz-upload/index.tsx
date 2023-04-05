import { useRef, forwardRef, useImperativeHandle } from 'react'
import BzUploadComponent from '@bz/bz-react-upload'
import '@bz/bz-react-upload/dist/index.esm.css'
import PropTypes from 'prop-types'
import { getEnv } from '@/config/settings'
import { getToken } from '@/utils/auth'
import { message } from 'antd'
import { loginOut } from '@/store/modules/user'

const env = getEnv(import.meta.env.VITE_APP_ENV)

function NOOP() {}

const BzUpload = forwardRef<any, any>((props, ref) => {
  const bzUploadRef = useRef(null)

  const onError = res => {
    if (res.status === 500) {
      message.error('登录已失效，请重新登录')
      loginOut()
      window.location.href = '/'
    }
    if (res.status === 502) {
      message.error('服务器响应失败，请重试')
    }
  }

  const uploadProps = {
    ...props,
    onError,
    ref: bzUploadRef
  }

  if (!uploadProps.aliyun) {
    if (uploadProps.isBim) {
      uploadProps.action = import.meta.env.VITE_APP_FTP_API + `/ftp/uploadFile?path=${env}/bim_temp/$md5`
    } else {
      uploadProps.action = import.meta.env.VITE_APP_FTP_API + `/ftp/uploadFile?path=${env}/file/$md5`
    }
  }

  useImperativeHandle(ref, () => ({
    bzUploadRef
  }))

  return (
    <>
      <BzUploadComponent ref={bzUploadRef} {...uploadProps}>
        {uploadProps.children}
      </BzUploadComponent>
    </>
  )
})

BzUpload.defaultProps = {
  isBim: false,
  aliyun: false,
  directory: false,
  action: '',
  download: import.meta.env.VITE_APP_FTP_STATIC_API,
  headers: {
    token: getToken()
  },
  defaultData: {},
  data: {},
  filterDataFields: [],
  method: 'post',
  timeout: 1000 * 60 * 60,
  multiple: false,
  name: 'file',
  drag: false,
  dragLimit: 500,
  showFileList: true,
  accept: '',
  type: 'select',
  beforeUpload: NOOP,
  beforeRemove: NOOP,
  onDrag: NOOP,
  onRemove: NOOP,
  onStart: NOOP,
  onPreview: NOOP,
  onSuccess: NOOP,
  onProgress: NOOP,
  onError: NOOP,
  fileList: [],
  autoUpload: true,
  listType: 'text',
  hideRemove: false,
  limit: null,
  directoryWords: null,
  fileWords: null,
  onWords: null,
  onExceed: NOOP
}

BzUpload.propTypes = {
  isBim: PropTypes.bool,
  aliyun: PropTypes.bool,
  directory: PropTypes.bool,
  action: PropTypes.string.isRequired,
  download: PropTypes.string,
  headers: PropTypes.object,
  defaultData: PropTypes.object,
  data: PropTypes.object,
  filterDataFields: PropTypes.array,
  method: PropTypes.string,
  timeout: PropTypes.number,
  multiple: PropTypes.bool,
  name: PropTypes.string,
  drag: PropTypes.bool,
  showFileList: PropTypes.bool,
  accept: PropTypes.string,
  type: PropTypes.string,
  beforeUpload: PropTypes.func,
  beforeRemove: PropTypes.func,
  onRemove: PropTypes.func,
  onDrag: PropTypes.func,
  onStart: PropTypes.func,
  onPreview: PropTypes.func,
  onSuccess: PropTypes.func,
  onProgress: PropTypes.func,
  onError: PropTypes.func,
  fileList: PropTypes.array,
  autoUpload: PropTypes.bool,
  listType: PropTypes.string,
  httpRequest: PropTypes.func,
  disabled: PropTypes.bool,
  hideRemove: PropTypes.bool,
  limit: PropTypes.number,
  directoryWords: PropTypes.number,
  fileWords: PropTypes.number,
  onExceed: PropTypes.func,
  onWords: PropTypes.func,
  children: PropTypes.any
}

BzUpload.displayName = 'BzUpload'

export default BzUpload
