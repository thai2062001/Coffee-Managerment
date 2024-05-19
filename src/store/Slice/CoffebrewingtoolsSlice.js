// staffReducer.js
import { createSlice } from "@reduxjs/toolkit";
import { callAPINoHead } from "../../ultils/axiosApi";
import { path } from "../../ultils/constant";
const coffeeToolsSlice = createSlice({
  name: "tools",
  initialState: { list: [], loading: false, error: null },
  reducers: {
    fetchCoffeeToolsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCoffeeToolsSuccess(state, action) {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchCoffeeToolsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchCoffeeToolsStart, fetchCoffeeToolsFailure } =
  coffeeToolsSlice.actions;

export const fetchCoffeeToolsSuccess = (data) => ({
  type: "FETCH_COFFEE_TOOLS_SUCCESS",
  payload: data,
});

export const fetchCoffeeToolsData = () => async (dispatch) => {
  try {
    dispatch(fetchCoffeeToolsStart());
    const response = await callAPINoHead(
      path.API_BASE_URL + path.COFFEETOOLS_API_URL,
      "GET"
    );
    dispatch(fetchCoffeeToolsSuccess(response));
  } catch (error) {
    dispatch(fetchCoffeeToolsFailure(error.message));
  }
};

export default coffeeToolsSlice.reducer;
