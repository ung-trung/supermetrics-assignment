import { useAppSelector } from '@src/app/hooks'
import { IPost } from '@src/type'
import UserItem from './components/UserItem'
import { IUser } from '@src/type'
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
  const posts = useAppSelector((state) => state.post.posts)

  const distinctUsers = distinctUsersFromPosts(posts)

  return (
    <div>
      {distinctUsers.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  )
}

export default UserList
