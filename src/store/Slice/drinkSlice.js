import { createSlice } from "@reduxjs/toolkit";
import { callAPINoHead } from "../../ultils/axiosApi";
import { path } from "../../ultils/constant";
const drinkSlice = createSlice({
  name: "drink",
  initialState: { list: [], loading: false, error: null },
  reducers: {
    fetchDrinkStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDrinkSuccess(state, action) {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchDrinkFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDrinkStart, fetchDrinkFailure } = drinkSlice.actions;

export const fetchDrinkSuccess = (data) => ({
  type: "FETCH_DRINK_SUCCESS",
  payload: data,
});

export const fetchDrinkData = () => async (dispatch) => {
  try {
    dispatch(fetchDrinkStart());
    const response = await callAPINoHead(
      path.API_BASE_URL + path.DRINK_API_URL,
      "GET"
    );
    dispatch(fetchDrinkSuccess(response));
  } catch (error) {
    dispatch(fetchDrinkFailure(error.message));
  }
};

export default drinkSlice.reducer;
