import ReactDOM from 'react-dom/client'
import Loading from './loading'

let loadingCount = 0

export const showLoading = () => {
  if (loadingCount === 0) {
    const dom = document.createElement('div')
    dom.setAttribute('id', 'qd-loading')
    document.body.appendChild(dom)
    ReactDOM.createRoot(dom).render(<Loading />)
  }
  loadingCount++
}

export const hideLoading = () => {
  if (loadingCount <= 0) return
  loadingCount--
  if (loadingCount === 0) {
    document.body.removeChild(document.getElementById('qd-loading') as HTMLElement)
  }
}
