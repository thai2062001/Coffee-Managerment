import { createSlice } from "@reduxjs/toolkit";
import { callAPINoHead } from "../../ultils/axiosApi";
import { path } from "../../ultils/constant";
const menuSlice = createSlice({
  name: "menu",
  initialState: { list: [], loading: false, error: null },
  reducers: {
    fetchMenuStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchMenuSuccess(state, action) {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchMenuFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchMenuStart, fetchMenuFailure } = menuSlice.actions;

export const fetchMenuSuccess = (data) => ({
  type: "FETCH_MENU_SUCCESS",
  payload: data,
});

export const fetchMenuData = () => async (dispatch) => {
  try {
    dispatch(fetchMenuStart());
    const response = await callAPINoHead(
      path.API_BASE_URL + path.MENU_API_URL,
      "GET"
    );
    dispatch(fetchMenuSuccess(response));
  } catch (error) {
    dispatch(fetchMenuFailure(error.message));
  }
};

export default menuSlice.reducer;
