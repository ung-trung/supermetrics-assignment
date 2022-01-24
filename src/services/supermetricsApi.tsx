import axios, { AxiosRequestTransformer } from 'axios'
import store from '@src/app/store'
import { logout } from '@src/features/auth/authSlice'
const supermetricsApi = axios.create({
  baseURL: 'https://api.supermetrics.com',
  transformRequest: [
    (data) => {
      return { ...data, client_id: process.env.NEXT_PUBLIC_CLIENT_ID }
    },
    ...(axios.defaults.transformRequest as AxiosRequestTransformer[])
  ]
})

supermetricsApi.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response.status === 500) {
      store.dispatch(logout())
    }
    return Promise.reject(error)
  }
)

export default supermetricsApi
