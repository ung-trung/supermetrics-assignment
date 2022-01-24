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
    togglePostDateOrder: (state) => {
      state.postDateOrder = state.postDateOrder === 'asc' ? 'desc' : 'asc'
    }
  }
})

export default filterSlice.reducer
export const { setUserFilterTerm, setPostFilterTerm, togglePostDateOrder } =
  filterSlice.actions
