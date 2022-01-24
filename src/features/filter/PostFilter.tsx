import { useAppDispatch } from '@src/app/hooks'
import { setPostFilterTerm } from './filterSlice'

const PostFilter = () => {
  const dispatch = useAppDispatch()
  return (
    <input
      className="input"
      placeholder="Search post content"
      onChange={(e) => {
        dispatch(setPostFilterTerm(e.target.value))
      }}
      type="text"
    />
  )
}

export default PostFilter
