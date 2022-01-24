import { IPost } from '@src/type'
import { FC } from 'react'
import styles from './PostItem.module.css'
const PostItem: FC<{ post: IPost }> = ({ post }) => {
  return (
    <div className={styles.container}>
      <div className={styles.time}>
        {new Date(post.created_time).toUTCString().slice(0, -3)}
      </div>
      <div className={styles.content}> {post.message}</div>
    </div>
  )
}

export default PostItem
