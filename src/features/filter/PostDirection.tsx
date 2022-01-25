import { useAppDispatch, useAppSelector } from '@src/app/hooks'
import ArrowDownIcon from '@src/common/ArrowDownIcon'
import ArrowUpIcon from '@src/common/ArrowUpIcon'
import { togglePostDateOrder } from './filterSlice'

const PostDirection = () => {
  const postDateOrder = useAppSelector((state) => state.filter.postDateOrder)
  const dispatch = useAppDispatch()
  return (
    <button
      data-testid="change-post-direct"
      aria-label={`sort post via date in ${
        postDateOrder === 'desc' ? 'asc' : 'desc'
      } order`}
      className="icon-btn"
      onClick={() => {
        dispatch(togglePostDateOrder())
      }}>
      {postDateOrder === 'desc' ? <ArrowDownIcon /> : <ArrowUpIcon />}
    </button>
  )
}

export default PostDirection
