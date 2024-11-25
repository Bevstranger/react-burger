import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getData, BASE_URL } from '../api/api';

const URL = `${BASE_URL}/ingredients`;

export const ingredientsRequest = createAsyncThunk(
  'ing/ingredientsRequest',
  async () => {
    const response = await getData(URL);
    return response.data;
  }
);

export const ingSlice = createSlice({
  name: 'ing',
  initialState: {
    data: [],
    error: false,
    fetching: false,
    fetched: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ingredientsRequest.fulfilled, (state, action) => {
      state.data = action.payload;
      state.fetching = false;
      state.fetched = true;
    }),
      builder.addCase(ingredientsRequest.pending, (state) => {
        state.fetching = true;
        state.fetched = false;
      }),
      builder.addCase(ingredientsRequest.rejected, (state) => {
        state.fetching = false;
        state.fetched = false;
        state.error = true;
      });
  },
});
