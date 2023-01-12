import NotAuth from './pages/403'
import Loading from './components/Loading'
import { getAuthRouters, AuthRouteObject } from './auth-routes'
import useSWR from 'swr'
import { useRoutes } from 'react-router-dom'
import { lazy } from 'react'
// import { routers } from './routers'
// import { Navigate } from 'react-router-dom'

const Layout = lazy(() => import('./layout/Layout'))
const Application = lazy(() => import('./pages/Application'))
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const NotFound = lazy(() => import('./pages/404'))
const Setting = lazy(() => import('./pages/Setting'))

export const routers: AuthRouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    // genRoutersProp: true,
    genAuthRoutersProp: true,
    children: [
      {
        element: <Home />,
        auth: ['admin'],
        index: true
      },
      {
        path: '/setting',
        element: <Setting />
      },
      {
        path: '/application',
        element: <Application />,
        auth: ['application']
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  { path: '*', element: <NotFound /> }
]

const fetcher = async (): Promise<string[]> =>
  await new Promise(resolve => {
    setTimeout(() => {
      resolve(['admin'])
    }, 1000)
  })

function App() {
  const { data: auth, isValidating } = useSWR('/api/user', fetcher, {
    // close fetch on window focus
    revalidateOnFocus: false
  })

  return useRoutes(
    getAuthRouters({
      routers,
      noAuthElement: router => <NotAuth />,
      render: element => (isValidating ? <Loading /> : element),
      auth: auth || []
    })
  )
}

export default App

// 使用
// ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// );
