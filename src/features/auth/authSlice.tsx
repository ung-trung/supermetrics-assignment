import {
  createSlice,
  createAsyncThunk,
  SerializedError
} from '@reduxjs/toolkit'
import supermetricsApi from '@src/services/supermetricsApi'
import { IUserRegisterResponse, IUserRegisterData } from '@src/type'

export interface User {
  email: string
}
export interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  error: SerializedError
}
export interface LoginParams {
  email: string
  name: string
}

const initialState: AuthState =
  typeof localStorage !== 'undefined' &&
  localStorage.getItem('email') &&
  localStorage.getItem('token')
    ? {
        user: {
          email: localStorage.getItem('email')
        },
        token: localStorage.getItem('token'),
        isLoading: false,
        error: null
      }
    : {
        user: null,
        token: null,
        isLoading: false,
        error: null
      }

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem('token')
      localStorage.removeItem('email')
      return {
        user: null,
        token: null,
        isLoading: false,
        error: null
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = { email: action.payload.email }
        state.token = action.payload.sl_token
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error
      })
  }
})

export const login = createAsyncThunk<IUserRegisterData, LoginParams>(
  'auth/login',
  async ({ name, email }) => {
    const res = await supermetricsApi.post('/assignment/register', {
      name,
      email
    })
    const data: IUserRegisterResponse = res.data
    localStorage.setItem('token', data.data.sl_token)
    localStorage.setItem('email', data.data.email)
    return data.data
  }
)
export const { logout } = authSlice.actions
export default authSlice.reducer
