import {
  createSlice,
  createAsyncThunk,
  SerializedError
} from '@reduxjs/toolkit'
import { AppState } from '@src/app/store'
import supermetricsApi from '@src/services/supermetricsApi'

import { IPostFetchResponse, IPost } from '@src/type'

interface PostState {
  posts: IPost[]
  isLoading: boolean
  error: SerializedError
}
export interface FetchPostsParams {
  page: number | string
}

const initialState: PostState = {
  posts: [],
  isLoading: false,
  error: null
}

const maxPage = 10

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false
        state.posts = action.payload
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error
      })
  }
})

export const fetchPosts = createAsyncThunk<
  IPost[],
  undefined,
  { state: AppState }
>('post/fetchPosts', async (_, { getState }) => {
  const sl_token = getState().auth.token
  if (!sl_token) {
    throw 'No token found'
  }
  const promises = Array.from(Array(maxPage).keys()).map((page) =>
    supermetricsApi.get(
      `/assignment/posts?sl_token=${sl_token}&page=${page + 1}`
    )
  )
  const responses = await Promise.all(promises)

  const result: IPost[] = responses
    .map((res) => res.data as IPostFetchResponse)
    .reduce((acc, cur) => {
      return [...acc, ...cur.data.posts]
    }, [])

  return result
})

export default postSlice.reducer
