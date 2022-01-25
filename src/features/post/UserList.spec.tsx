import { render, screen, within } from '@testing-library/react'
import user from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { makeStore } from '@src/app/store'
import mockRouter from 'next-router-mock'
import UserList from './UserList'
import UserFilter from '../filter/UserFilter'
jest.mock('next/dist/client/router', () => require('next-router-mock'))
const mockStore = {
  post: {
    posts: [
      {
        id: '1',
        from_name: 'User 1',
        from_id: 'user_1',
        message: 'Random message 1',
        type: 'status',
        created_time: '2022-01-20T05:50:15+00:00'
      },
      {
        id: '12',
        from_name: 'User 1',
        from_id: 'user_1',
        message: 'Random message 2',
        type: 'status',
        created_time: '2022-01-20T05:50:15+00:00'
      },
      {
        id: '11',
        from_name: 'User 11',
        from_id: 'user_11',
        message: 'Random message 3',
        type: 'status',
        created_time: '2022-02-20T05:50:15+00:00'
      },
      {
        id: '2',
        from_name: 'User 2',
        from_id: 'user_2',
        message: 'Random message 4',
        type: 'status',
        created_time: '2022-02-20T05:50:15+00:00'
      },
      {
        id: '3',
        from_name: 'User 3',
        from_id: 'user_3',
        message: 'Random message 5',
        type: 'status',
        created_time: '2022-05-20T05:50:15+00:00'
      }
    ]
  },
  filter: {
    userFilterTerm: '',
    postFilterTerm: '',
    postDateOrder: 'desc'
  }
}

describe('<UserListPost />', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/?user_id=user_1')
  })
  it('renders the component and show 4 users', () => {
    const store = makeStore(mockStore)

    render(
      <Provider store={store}>
        <UserFilter></UserFilter>
        <UserList />
      </Provider>
    )

    expect(screen.getAllByText(/user/i)).toHaveLength(4)
  })
  it('change post filter term', () => {
    const store = makeStore(mockStore)

    render(
      <Provider store={store}>
        <UserFilter></UserFilter>
        <UserList />
      </Provider>
    )

    user.type(screen.getByPlaceholderText(/search user name/i), 'user 1')
    expect(screen.getAllByText(/user/i)).toHaveLength(2)
  })
  it('user 1 has 2 posts', () => {
    const store = makeStore(mockStore)

    render(
      <Provider store={store}>
        <UserFilter></UserFilter>
        <UserList />
      </Provider>
    )

    expect(
      within(
        screen.getByText('User 1').parentElement.parentElement
      ).getByTestId('post-count', { exact: false }).textContent
    ).toBe('2')
  })
})
