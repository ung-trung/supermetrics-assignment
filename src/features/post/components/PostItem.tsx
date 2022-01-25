import { useAppSelector } from '@src/app/hooks'
import { IPost } from '@src/type'
import { FC } from 'react'
import styles from './PostItem.module.css'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
const PostItem: FC<{ post: IPost }> = ({ post }) => {
  const postFilterTerm = useAppSelector((state) => state.filter.postFilterTerm)
  const matches = match(
    post.message.toLocaleLowerCase(),
    postFilterTerm.toLocaleLowerCase(),
    { insideWords: true }
  )
  const parts = parse(post.message, matches)
  return (
    <div className={styles.container}>
      <div className={styles.time} data-testid={`post-time-${post.id}`}>
        {new Date(post.created_time).toUTCString().slice(0, -3)}
      </div>
      <div className={styles.content}>
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
    </div>
  )
}

export default PostItem
