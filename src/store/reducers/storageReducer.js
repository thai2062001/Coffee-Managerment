const initialState = {
  storageList: [],
};

function storageReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_STORAGE_SUCCESS":
      return {
        ...state,
        storageList: action.payload,
      };
    default:
      return state;
  }
}

export default storageReducer;
