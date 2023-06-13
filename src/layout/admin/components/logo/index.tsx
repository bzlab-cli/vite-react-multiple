import { useStoreSelector } from '@/views/admin/store'
import { Settings } from '@/config/settings'
import styles from './index.module.scss'

export default function Logo() {
  const { collapsed } = useStoreSelector(state => state.app)
  return (
    <div className={styles.logo}>
      <img className={styles['logo-img']} src={Settings.logo} />
      <div className={styles['logo-name']}>
        {!collapsed && <h1 className={styles['logo-text']}>{Settings.title}</h1>}
      </div>
    </div>
  )
}
