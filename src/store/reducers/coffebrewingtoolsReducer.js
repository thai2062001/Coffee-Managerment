const initialState = {
  toolsList: [],
};

function coffebrewingtoolsReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_COFFEE_TOOLS_SUCCESS":
      return {
        ...state,
        toolsList: action.payload,
      };
    default:
      return state;
  }
}

export default coffebrewingtoolsReducer;
