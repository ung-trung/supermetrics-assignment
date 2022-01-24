import axios, { AxiosRequestTransformer } from 'axios'

const supermetricsApi = axios.create({
  baseURL: 'https://api.supermetrics.com',
  transformRequest: [
    (data) => {
      return { ...data, client_id: process.env.NEXT_PUBLIC_CLIENT_ID }
    },
    ...(axios.defaults.transformRequest as AxiosRequestTransformer[])
  ]
})

export default supermetricsApi
