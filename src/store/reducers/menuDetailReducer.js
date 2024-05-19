const initialState = {
  menuDetailList: [],
};

function menuDetailReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_MENU_DETAILS_SUCCESS":
      return {
        ...state,
        menuDetailList: action.payload,
      };
    default:
      return state;
  }
}

export default menuDetailReducer;
