import { ElMessageBox, ElMessage } from 'element-plus'
import { HandleData } from '@/interface/table'

/**
 * @description 二次确认弹窗
 * @param {Function} api 数据接口
 * @param {Object} params 接口数据参数
 * @param {String} message 提示信息
 * @param {String} confirmType 消息类型，默认warning
 * @return Promise
 */
export const useConfirm = <P = any>(
  api: (params: P) => Promise<IResponseModel<any>>,
  params: Parameters<typeof api>[0],
  message: string,
  confirmType: HandleData.MessageType = 'warning'
) => {
  return new Promise((resolve, reject) => {
    ElMessageBox.confirm(message, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: confirmType,
      draggable: false
    })
      .then(async () => {
        const { retCode, retMsg } = await api(params)
        if (retCode !== 200) return ElMessage.warning(retMsg)
        ElMessage({
          type: 'success',
          message: `操作成功`
        })
        resolve(true)
      })
      .catch(() => reject('cancel'))
  })
}
