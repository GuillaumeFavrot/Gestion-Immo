import { createSlice } from "@reduxjs/toolkit"

const viewSlice = createSlice({
  name: "view",
  initialState: {
    page: "Apartments",
    theme: {
      mainBackground: "secondary",
      secondaryBackground: "dark",
      border: "light",
      text: "light"
    }
  },
  reducers: {
    modifyPage(state, action) {
      state.page = action.payload;
    }
  }
})

export const { modifyPage } = viewSlice.actions
export default viewSlice.reducer
