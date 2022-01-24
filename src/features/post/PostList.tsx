import { useAppSelector } from '@src/app/hooks'
import { useRouter } from 'next/router'
import PostItem from './components/PostItem'

const PostList = () => {
  const router = useRouter()
  const postFilterTerm = useAppSelector((state) => state.filter.postFilterTerm)
  const postDateOrder = useAppSelector((state) => state.filter.postDateOrder)
  const posts = useAppSelector((state) => state.post.posts)
  const selectedUserId = router.query.user_id
  const userPosts = posts.filter((post) => post.from_id === selectedUserId)

  return (
    <div>
      {userPosts
        .filter((post) =>
          post.message
            .toLocaleLowerCase()
            .includes(postFilterTerm.toLocaleLowerCase())
        )
        .sort((a, b) => {
          if (a.created_time > b.created_time)
            return postDateOrder === 'desc' ? -1 : 1
          if (a.created_time < b.created_time)
            return postDateOrder === 'desc' ? 1 : -1
          return 0
        })
        .map((post) => (
          <PostItem key={post.id} post={post}></PostItem>
        ))}
    </div>
  )
}

export default PostList