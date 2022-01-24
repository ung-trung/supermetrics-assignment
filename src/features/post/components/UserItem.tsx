import { IUser } from '@src/type'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import styles from './UserItem.module.css'
const UserItem: FC<{ user: IUser }> = ({ user }) => {
  const router = useRouter()
  const selectedUserId = router.query.user_id
  return (
    <Link href={`/?user_id=${user.id}`}>
      <div
        className={`${styles.container} ${
          selectedUserId === user.id ? styles.active : ''
        }`}>
        <div>{user.name}</div>
        <div className={styles.postCount}>{user.postCount}</div>
      </div>
    </Link>
  )
}

export default UserItem
