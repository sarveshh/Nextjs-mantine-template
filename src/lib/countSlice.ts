import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CountState {
  count: number;
}

export const countSlice = createSlice({
  name: "count",
  initialState: { count: 0 } as CountState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = countSlice.actions;
export default countSlice.reducer;
