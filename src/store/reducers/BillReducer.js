const initialState = {
  billList: [],
};

function BillReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_BILL_SUCCESS":
      return {
        ...state,
        billList: action.payload,
      };
    default:
      return state;
  }
}

export default BillReducer;
