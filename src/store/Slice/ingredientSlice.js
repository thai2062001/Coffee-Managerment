import { createSlice } from "@reduxjs/toolkit";
import { callAPINoHead } from "../../ultils/axiosApi";
import { path } from "../../ultils/constant";
const ingredientSlice = createSlice({
  name: "ingredient",
  initialState: { list: [], loading: false, error: null },
  reducers: {
    fetchIngredientStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchIngredientSuccess(state, action) {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchIngredientFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchIngredientStart, fetchIngredientFailure } =
  ingredientSlice.actions;

export const fetchIngredientSuccess = (data) => ({
  type: "FETCH_INGREDIENT_SUCCESS",
  payload: data,
});

export const fetchIngredientData = () => async (dispatch) => {
  try {
    dispatch(fetchIngredientStart());
    const response = await callAPINoHead(
      path.API_BASE_URL + path.INGREDIENT_API_URL,
      "GET"
    );
    dispatch(fetchIngredientSuccess(response));
  } catch (error) {
    dispatch(fetchIngredientFailure(error.message));
  }
};

export default ingredientSlice.reducer;
