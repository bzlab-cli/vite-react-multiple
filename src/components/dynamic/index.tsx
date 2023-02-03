// import ReactDOM from 'react-dom/client'

const isString = o => {
  return Object.prototype.toString.call(o) === '[object String]'
}

interface DynamicProps {
  className?: string
  el?: string | HTMLElement
  data?: { [key: string]: any }
  render: any
}

let ReactDOM
const show = async (props: DynamicProps) => {
  const { className, el, data = {}, render: Render } = props
  const container = document.createElement('div')
  const target: any = isString(el) ? document.querySelector(el as string) : el
  const classList: string[] = []
  if (className) {
    className.split(' ').forEach(item => classList.push(item))
    classList.forEach(item => container.classList.add(item))
  }
  if (el) {
    target.appendChild(container)
  }

  let instance = null as any
  const unmounted = () => {
    if (el) {
      target.removeChild(instance)
    }
  }

  const promise = new Promise((resolve, reject) => {
    const props = { callback: resolve, destroy: reject, ...data }
    const root = ReactDOM.createRoot(container)
    root.render(<Render {...props} />)
    instance = container
  })

  const callback = res => {
    unmounted()
    return Promise.resolve(res)
  }

  const destroy = err => {
    unmounted()
    return Promise.reject(err)
  }

  return promise.then(callback, destroy)
}

const mount = dom => {
  ReactDOM = dom
}

export default {
  show,
  mount
}
