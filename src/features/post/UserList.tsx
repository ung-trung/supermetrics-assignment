import { useAppSelector } from '@src/app/hooks'
import { IPost, IUser } from '@src/type'
import UserItem from './components/UserItem'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import styles from './share.module.css'

const distinctUsersFromPosts = (posts: IPost[]): IUser[] => {
  const distinctUserIds = [
    ...Array.from(new Set(posts.map((post) => post.from_id)))
  ]
  const users = distinctUserIds.map((id) => {
    const userPost = posts.find((post) => post.from_id === id)
    const postCount = posts.filter((post) => post.from_id === id).length
    const user = {
      id: userPost.from_id,
      name: userPost.from_name,
      postCount
    }
    return user
  })
  return users
}

const UserList = () => {
  const router = useRouter()
  const userFilterTerm = useAppSelector((state) => state.filter.userFilterTerm)
  const posts = useAppSelector((state) => state.post.posts)
  const distinctUsers = distinctUsersFromPosts(posts)
  const selectedUserId = router.query.user_id

  useEffect(() => {
    if (!selectedUserId && distinctUsers.length > 0) {
      router.push(`/?user_id=${distinctUsers[0].id}`)
    }
  }, [selectedUserId, distinctUsers])

  return (
    <div className={styles.container}>
      {distinctUsers
        .filter((user) =>
          user.name
            .toLocaleLowerCase()
            .includes(userFilterTerm.toLocaleLowerCase())
        )
        .sort((a, b) => {
          if (a.name < b.name) return -1
          if (a.name > b.name) return 1
          return 0
        })
        .map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
    </div>
  )
}

export default UserList
