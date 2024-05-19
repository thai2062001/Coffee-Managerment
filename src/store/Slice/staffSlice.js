// staffReducer.js
import { createSlice } from "@reduxjs/toolkit";
import { callAPINoHead, callAPIHead } from "../../ultils/axiosApi";
import { path } from "../../ultils/constant";
const staffSlice = createSlice({
  name: "staff",
  initialState: { list: [], loading: false, error: null },
  reducers: {
    fetchStaffStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchStaffSuccess(state, action) {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchStaffFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchStaffStart, fetchStaffFailure } = staffSlice.actions;

export const fetchStaffSuccess = (data) => ({
  type: "FETCH_STAFF_SUCCESS",
  payload: data,
});

export const fetchStaffData = () => async (dispatch) => {
  try {
    dispatch(fetchStaffStart());
    const response = await callAPIHead(
      path.API_BASE_URL + path.STAFF_API_URL,
      "GET"
    );
    dispatch(fetchStaffSuccess(response));
  } catch (error) {
    dispatch(fetchStaffFailure(error.message));
  }
};

export default staffSlice.reducer;
