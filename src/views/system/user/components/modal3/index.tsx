import ReactDOM from 'react-dom'

const Modal = ({
  visible = false,
  style,
  width = 520,
  zIndex = 1000,
  centered = false,
  title = 'title',
  footer,
  wrapClassName = '',
  okText = '确定',
  okType = 'primary',
  cancelText = '取消',
  cancelType = 'default',
  closable = true,
  onOk = () => {},
  onCancel = () => {},
  mask = true,
  maskClosable = true,
  children = 'Basic body'
}) => {
  return visible ? ReactDOM.createPortal(<div>....</div>, document.querySelector('body')) : null
}

export default Modal

// 使用
{
  /* <Button onClick={this.showModal}>modal</Button>
<Modal visible={visible} onCancel={this.onCancel} onOk={this.onOk}>
    <div>modal提示内容</div>
</Modal> */
}
