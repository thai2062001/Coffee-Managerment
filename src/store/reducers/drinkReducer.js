const initialState = {
  drinkList: [],
};

function drinkReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_DRINK_SUCCESS":
      return {
        ...state,
        drinkList: action.payload,
      };
    default:
      return state;
  }
}

export default drinkReducer;
