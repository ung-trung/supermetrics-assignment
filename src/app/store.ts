import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import auth from '@src/features/auth/authSlice'
import post from '@src/features/post/postSlice'

export function makeStore() {
  return configureStore({
    reducer: { post, auth }
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
