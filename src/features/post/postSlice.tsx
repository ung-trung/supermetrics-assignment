import {
  createSlice,
  createAsyncThunk,
  SerializedError
} from '@reduxjs/toolkit'
import { AppState } from '@src/app/store'
import supermetricsApi from '@src/services/supermetricsApi'

import { IPostFetchData, IPostFetchResponse, IPost } from '@src/type'

interface PostState {
  posts: IPost[]
  isLoading: boolean
  allLoaded: boolean
  pageNumber: number | string
  error: SerializedError
}
export interface FetchPostsParams {
  page: number | string
  name: string
}

const initialState: PostState = {
  posts: [],
  pageNumber: 1,
  isLoading: false,
  allLoaded: false,
  error: null
}

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
        state.posts = state.posts.concat(action.payload.posts)
        state.pageNumber = action.payload.page
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error
      })
  }
})

export const fetchPosts = createAsyncThunk<
  IPostFetchData,
  FetchPostsParams,
  { state: AppState }
>('auth/login', async ({ page }, { getState }) => {
  const sl_token = getState().auth.token
  if (!sl_token) {
    throw 'No token found'
  }
  const res = await supermetricsApi.get(
    `/assignment/posts/sl_token=${sl_token}&page=${page}`
  )
  const data: IPostFetchResponse = res.data
  return data.data
})

export default postSlice.reducer
