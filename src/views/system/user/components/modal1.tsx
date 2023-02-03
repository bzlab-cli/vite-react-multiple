const appRoot = document.getElementById('root')
const modalRoot = document.getElementById('modal-root')

class ModalContainer extends Component {
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
  }
  componentDidMount() {
    modalRoot.appendChild(this.el)
  }
  componentWillUnmount() {
    modalRoot.removeChild(this.el)
  }
  render() {
    return ReactDOM.createPortal(this.props.children, this.el)
  }
}
