import { IUser } from '@src/type'
import Link from 'next/link'
import { FC } from 'react'

const UserItem: FC<{ user: IUser }> = ({ user }) => {
  return (
    <div>
      <Link href={`/?user_id=${user.id}`}>
        <div>
          {user.name} {user.postCount}
        </div>
      </Link>
    </div>
  )
}

export default UserItem
