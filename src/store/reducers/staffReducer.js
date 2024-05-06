const initialState = {
  staffList: [],
};

function staffReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_STAFF_SUCCESS":
      return {
        ...state,
        staffList: action.payload,
      };
    default:
      return state;
  }
}

export default staffReducer;
