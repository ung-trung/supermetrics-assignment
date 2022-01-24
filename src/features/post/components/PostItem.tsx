import { IPost } from '@src/type'
import { FC } from 'react'

const PostItem: FC<{ post: IPost }> = ({ post }) => {
  return (
    <div>
      {post.message} {post.created_time}
    </div>
  )
}

export default PostItem
