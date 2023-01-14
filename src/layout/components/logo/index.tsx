import { useStoreSelector } from '@/store'
import logo from '@/assets/images/logo/logo.png'
import styles from './index.module.scss'

export default function Logo() {
  const { collapsed } = useStoreSelector(state => state.app)
  return (
    <div className={styles.logo}>
      <img className={styles['logo-img']} src={logo} />
      <div style={{ width: !collapsed ? 141 : 0, transition: 'width 0.3s' }}>
        <h1 className={styles['logo-text']}>后台管理</h1>
      </div>
    </div>
  )
}
