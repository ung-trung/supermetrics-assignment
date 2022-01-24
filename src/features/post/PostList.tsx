import { useAppSelector } from '@src/app/hooks'
import { useRouter } from 'next/router'
import PostItem from './components/PostItem'

const PostList = () => {
  const router = useRouter()
  const posts = useAppSelector((state) => state.post.posts)
  const selectedUserId = router.query.user_id
  const userPosts = posts.filter((post) => post.from_id === selectedUserId)
  return (
    <div>
      {userPosts.map((post) => (
        <PostItem key={post.id} post={post}></PostItem>
      ))}
    </div>
  )
}

export default PostList
