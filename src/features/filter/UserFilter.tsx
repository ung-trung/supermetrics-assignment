import { useAppDispatch } from '@src/app/hooks'
import { setUserFilterTerm } from './filterSlice'

const UserFilter = () => {
  const dispatch = useAppDispatch()
  return (
    <input
      className="input"
      placeholder="Search user name"
      onChange={(e) => {
        dispatch(setUserFilterTerm(e.target.value))
      }}
      type="text"
    />
  )
}

export default UserFilter
