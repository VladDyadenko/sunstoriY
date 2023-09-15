import { addChild } from './childOperetion';

const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  child: [],
  isloading: false,
  error: null,
};

const childrenSlice = createSlice({
  name: 'children',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addChild.pending, state => {
        state.isloading = true;
      })
      .addCase(addChild.fulfilled, (state, action) => {
        state.isloading = false;
        state.error = null;
        state.child.push(action.payload);
      })
      .addCase(addChild.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.payload;
      });
  },
});

export const childrenReducer = childrenSlice.reducer;
