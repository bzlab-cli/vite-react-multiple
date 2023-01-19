import { useNavigate, useRoutes } from 'react-router-dom'
import { ReactRouterMiddleware, useMiddlewareRoutes } from '../lib/index'
import App from './App'
import Home from './home'
import Login from './login'
import Admin from './admin'
import Show from './show'

export default function Router() {
  const navigate = useNavigate()

  /**
   * @method checkLogin
   * @description 鉴权-登录
   */
  const checkLogin = () => {
    // 获取登录信息
    const isLogin = !!localStorage.getItem('token')

    if (!isLogin) {
      navigate('/login', {
        replace: true
      })
      return false
    }
    return true
  }

  /**
   * @method checkRole
   * @description 鉴权-用户角色
   */
  const checkRole = route => {
    const localRole = localStorage.getItem('role') || JSON.stringify([])
    const getRoles = JSON.parse(localRole)
    const hasPageRole = getRoles.some(role => route.allowRoles?.includes(role))

    if (!hasPageRole) {
      console.log(`该页面需要角色权限${route.allowRoles},而当前用户只有角色权限${getRoles},重定向首页了`)

      navigate('/', {
        replace: true
      })
      // 未通过鉴权，返回false
      return false
    }

    // 通过鉴权，返回true
    return true
  }

  /**
   * @description 路由配置
   *
   */
  const routes = [
    {
      path: '/',
      key: 'index',
      element: <App />,
      children: [
        {
          index: true,
          key: 'home',
          middleware: [checkLogin],
          element: <Home />
        },
        {
          path: 'show',
          key: 'show',
          allowRoles: ['group1'],
          middleware: [checkLogin, checkRole],
          element: <Show />
        },
        {
          path: 'admin',
          key: 'admin',
          allowRoles: ['admin'],
          middleware: [checkLogin, checkRole],
          element: <Admin />
        }
      ]
    },
    {
      path: '/login',
      key: 'login',
      element: <Login />
    }
  ]

  // 原来
  // return useRoutes(routes);

  // 使用2
  // const RoutesElement = useMiddlewareRoutes(routes);
  // return RoutesElement;

  // 使用1
  return <ReactRouterMiddleware routes={routes} />
}
