import { Modal, message } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'

/**
 * @description 二次确认弹窗
 * @param {Function} api 数据接口
 * @param {Object} params 接口数据参数
 * @param {String} message 提示信息
 * @param {String} confirmType 消息类型，默认warning
 * @return Promise
 */
export const useConfirm = <P = any,>(
  api: (params: P) => Promise<IResponseModel<any>>,
  params: Parameters<typeof api>[0],
  content: string,
  options?
) => {
  return new Promise((resolve, reject) => {
    Modal.confirm({
      icon: <ExclamationCircleFilled />,
      maskClosable: options?.maskClosable ?? true,
      title: options?.title ?? '提示',
      okText: options?.okText ?? '确定',
      cancelText: options?.cancelText ?? '取消',
      content,
      onOk: async () => {
        const { retCode, retMsg } = await api(params)
        if (retCode !== 200) return message.warning(retMsg)
        message.success('操作成功')
        resolve(true)
      },
      onCancel: () => reject('cancel')
    })
  })
}
