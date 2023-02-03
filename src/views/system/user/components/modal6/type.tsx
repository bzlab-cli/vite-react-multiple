import { ModalProps as AntdModalProps } from 'antd'

interface Options {
  afterShowModal?(): void | Promise<void>
}

export interface ModalRef {
  showModal(options?: Options): Promise<void>
  closeModal(): void
}

export interface ModalProps extends Omit<AntdModalProps, 'onOk' | 'onCancel'> {
  onOk?: OnOkType
  onCancel?(): void | Promise<void>
}

export type OnOkType = (event: React.MouseEvent<HTMLElement> & { stopClose: () => void }) => void | Promise<void>
