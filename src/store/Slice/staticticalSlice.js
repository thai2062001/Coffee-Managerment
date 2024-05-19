import { createSlice } from "@reduxjs/toolkit";
import { callAPINoHead } from "../../ultils/axiosApi";
import { path } from "../../ultils/constant";
const staticticalSlice = createSlice({
  name: "statictical",
  initialState: { list: [], loading: false, error: null },
  reducers: {
    fetchStaticticalStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchStaticticalSuccess(state, action) {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchStaticticalFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchStaticticalStart, fetchStaticticalFailure } =
  staticticalSlice.actions;

export const fetchStaticticalSuccess = (data) => ({
  type: "FETCH_STATICTICALLIST_SUCCESS",
  payload: data,
});

export const fetchStaticticalData = () => async (dispatch) => {
  try {
    dispatch(fetchStaticticalStart());
    const response = await callAPINoHead(
      path.API_BASE_URL + path.MENU_API_URL,
      "GET"
    );
    dispatch(fetchStaticticalSuccess(response));
  } catch (error) {
    dispatch(fetchStaticticalFailure(error.message));
  }
};

export default staticticalSlice.reducer;
