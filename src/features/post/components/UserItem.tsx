import { useAppSelector } from '@src/app/hooks'
import { IUser } from '@src/type'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import styles from './UserItem.module.css'
const UserItem: FC<{ user: IUser; isActive: boolean }> = ({
  user,
  isActive
}) => {
  const router = useRouter()

  const userFilterTerm = useAppSelector((state) => state.filter.userFilterTerm)
  const matches = match(
    user.name.toLocaleLowerCase(),
    userFilterTerm.toLocaleLowerCase(),
    { insideWords: true }
  )
  const parts = parse(user.name, matches)
  return (
    <Link href={`/?user_id=${user.id}`}>
      <div className={`${styles.container} ${isActive ? styles.active : ''}`}>
        <div>
          {parts.map((part, index) => (
            <span
              key={index}
              style={{
                fontWeight: part.highlight ? 700 : 400
              }}>
              {part.text}
            </span>
          ))}
        </div>
        <div data-testid={`post-count-${user.id}`} className={styles.postCount}>
          {user.postCount}
        </div>
      </div>
    </Link>
  )
}

export default UserItem
