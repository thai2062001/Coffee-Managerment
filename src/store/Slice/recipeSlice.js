import { createSlice } from "@reduxjs/toolkit";
import { callAPINoHead } from "../../ultils/axiosApi";
import { path } from "../../ultils/constant";
const recipeSlice = createSlice({
  name: "recipe",
  initialState: { list: [], loading: false, error: null },
  reducers: {
    fetchRecipeStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchRecipeSuccess(state, action) {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchRecipeFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchRecipeStart, fetchRecipeFailure } = recipeSlice.actions;

export const fetchRecipeSuccess = (data) => ({
  type: "FETCH_RECIPE_SUCCESS",
  payload: data,
});

export const fetchRecipeData = () => async (dispatch) => {
  try {
    dispatch(fetchRecipeStart());
    const response = await callAPINoHead(
      path.API_BASE_URL + path.RECIPE_API_URL,
      "GET"
    );
    dispatch(fetchRecipeSuccess(response));
  } catch (error) {
    dispatch(fetchRecipeFailure(error.message));
  }
};

export default recipeSlice.reducer;
