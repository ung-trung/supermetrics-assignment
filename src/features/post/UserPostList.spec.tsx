import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { makeStore } from '@src/app/store'
import mockRouter from 'next-router-mock'
import UserPostList from './UserPostList'
import PostFilter from '../filter/PostFilter'
import PostDirection from '../filter/PostDirection'

jest.mock('next/dist/client/router', () => require('next-router-mock'))

const mockPosts = [
  {
    id: '1',
    from_name: 'User 1',
    from_id: 'user_1',
    message: 'Message 1 from User 1',
    type: 'status',
    created_time: '2022-01-20T05:50:15+00:00'
  },
  {
    id: '2',
    from_name: 'User 1',
    from_id: 'user_1',
    message: 'Message 2 from User 1',
    type: 'status',
    created_time: '2022-02-20T05:50:15+00:00'
  },
  {
    id: '22',
    from_name: 'User 1',
    from_id: 'user_1',
    message: 'Message 22 from User 1',
    type: 'status',
    created_time: '2022-02-20T05:50:15+00:00'
  },
  {
    id: '3',
    from_name: 'User 1',
    from_id: 'user_1',
    message: 'Message 3 from User 1',
    type: 'status',
    created_time: '2022-05-20T05:50:15+00:00'
  }
]

describe('<UserListPost />', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/?user_id=user_1')
  })

  it('renders the component and show 4 posts', () => {
    const store = makeStore({
      post: { posts: mockPosts },
      filter: {
        userFilterTerm: '',
        postFilterTerm: '',
        postDateOrder: 'desc'
      }
    })

    render(
      <Provider store={store}>
        <PostFilter></PostFilter>
        <PostDirection></PostDirection>
        <UserPostList />
      </Provider>
    )

    expect(screen.getAllByText(/from user 1/i)).toHaveLength(4)
  })
  it('change post filter term', () => {
    const store = makeStore({
      post: { posts: mockPosts },
      filter: {
        userFilterTerm: '',
        postFilterTerm: '',
        postDateOrder: 'desc'
      }
    })

    render(
      <Provider store={store}>
        <PostFilter></PostFilter>
        <PostDirection></PostDirection>
        <UserPostList />
      </Provider>
    )

    user.type(screen.getByPlaceholderText(/search post content/i), 'message 2')
    expect(screen.getAllByText(/from user 1/i)).toHaveLength(2)
  })
  it('change post direction', () => {
    const store = makeStore({
      post: { posts: mockPosts },
      filter: {
        userFilterTerm: '',
        postFilterTerm: '',
        postDateOrder: 'desc'
      }
    })

    render(
      <Provider store={store}>
        <PostFilter></PostFilter>
        <PostDirection></PostDirection>
        <UserPostList />
      </Provider>
    )
    const allTimesBeforeChange = screen
      .getAllByTestId('post-time', { exact: false })
      .map((a) => a.textContent)
    for (let i = 0; i < allTimesBeforeChange.length - 1; i++) {
      const before = allTimesBeforeChange[i]
      const after = allTimesBeforeChange[i + 1]
      expect(before > after).toBeTruthy
    }
    user.click(
      screen.getByTestId('change-post-direct', {
        exact: false
      })
    )
    const allTimesAfterChange = screen
      .getAllByTestId('post-time', { exact: false })
      .map((a) => a.textContent)
    for (let i = 0; i < allTimesAfterChange.length - 1; i++) {
      const before = allTimesAfterChange[i]
      const after = allTimesAfterChange[i + 1]
      expect(before < after).toBeTruthy
    }
  })
})
