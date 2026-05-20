import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPins } from "@/lib/api/pins";
import { Pin } from "@/models/pins";

export const fetchPins = createAsyncThunk("pins/fetchPins", async () => {
  return getPins();
});

interface PinsState {
  pins: Pin[];
  loading: boolean;
  error: string | null;
}

const initialState: PinsState = {
  pins: [],
  loading: false,
  error: null,
};

const pinsSlice = createSlice({
  name: "pins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPins.fulfilled, (state, action) => {
        state.loading = false;
        state.pins = action.payload;
      })
      .addCase(fetchPins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch pins";
      });
  },
});

export default pinsSlice.reducer;
