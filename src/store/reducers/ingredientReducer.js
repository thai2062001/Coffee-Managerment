const initialState = {
  ingredientList: [],
};

function ingredientReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_INGREDIENT_SUCCESS":
      return {
        ...state,
        ingredientList: action.payload,
      };
    default:
      return state;
  }
}

export default ingredientReducer;
