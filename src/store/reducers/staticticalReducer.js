const initialState = {
  staticticalList: [],
};

function staticticalReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_STATICTICALLIST_SUCCESS":
      return {
        ...state,
        staticticalList: action.payload,
      };
    default:
      return state;
  }
}

export default staticticalReducer;
