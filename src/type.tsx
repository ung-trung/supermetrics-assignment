export interface IPostFetchResponse {
  meta: IMeta
  data: IPostFetchData
}

export interface IPostFetchData {
  page: number
  posts: IPost[]
}

export interface IPost {
  id: string
  from_name: string
  from_id: string
  message: string
  type: IType
  created_time: Date
}

export enum IType {
  Status = 'status'
}

export interface IMeta {
  request_id: string
}

export interface IUserRegisterResponse {
  meta: IMeta
  data: IUserRegisterData
}

export interface IUserRegisterData {
  client_id: string
  email: string
  sl_token: string
}
