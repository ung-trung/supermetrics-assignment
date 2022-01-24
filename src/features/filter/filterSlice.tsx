import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FilterState {
  userFilterTerm: string
  postFilterTerm: string
  postDateOrder: 'asc' | 'desc'
}

const initialState: FilterState = {
  userFilterTerm: '',
  postFilterTerm: '',
  postDateOrder: 'desc'
}

export const filterSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setUserFilterTerm: (state, action: PayloadAction<string>) => {
      state.userFilterTerm = action.payload
    },
    setPostFilterTerm: (state, action: PayloadAction<string>) => {
      state.postFilterTerm = action.payload
    },
    setPostDateOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.userFilterTerm = action.payload
    }
  }
})

export default filterSlice.reducer
export const { setUserFilterTerm, setPostFilterTerm, setPostDateOrder } =
  filterSlice.actions
