import './index.scss'
import { useStoreSelector } from '@/store'

const Dashboard = () => {
  const { token } = useStoreSelector(state => state.user)
  return <div className="dashboard">dashboard-{token}</div>
}

export default Dashboard
