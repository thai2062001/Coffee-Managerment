const initialState = {
  recipeList: [],
};

function recipeReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_RECIPE_SUCCESS":
      return {
        ...state,
        recipeList: action.payload,
      };
    default:
      return state;
  }
}

export default recipeReducer;
