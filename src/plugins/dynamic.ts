import { dynamic } from '@bzlab/bz-react-core'
import ReactDOM from 'react-dom/client'

export default function loadComponent(app) {
  dynamic.mount({ dom: ReactDOM, provider: app.provider, store: app.store })
}
