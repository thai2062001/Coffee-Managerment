import { createSlice } from "@reduxjs/toolkit";
import { callAPINoHead } from "../../ultils/axiosApi";
import { path } from "../../ultils/constant";
const menuDetailSlice = createSlice({
  name: "menuDetail",
  initialState: { list: [], loading: false, error: null },
  reducers: {
    fetchMenuDetailsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchMenuDetailsSuccess(state, action) {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchMenuDetailsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchMenuDetailsStart, fetchMenuDetailsFailure } =
  menuDetailSlice.actions;

export const fetchMenuDetailsSuccess = (data) => ({
  type: "FETCH_MENU_DETAILS_SUCCESS",
  payload: data,
});

export const fetchMenuDetailsData = () => async (dispatch) => {
  try {
    dispatch(fetchMenuDetailsStart());
    const response = await callAPINoHead(
      path.API_BASE_URL + path.MENUDETAILS_API_URL,
      "GET"
    );
    dispatch(fetchMenuDetailsSuccess(response));
  } catch (error) {
    dispatch(fetchMenuDetailsFailure(error.message));
  }
};

export default menuDetailSlice.reducer;
