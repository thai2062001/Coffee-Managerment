const initialState = {
  shopequipmentList: [],
};

function shopequipmentReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_SHOP_EQUIPMENT_SUCCESS":
      return {
        ...state,
        shopequipmentList: action.payload,
      };
    default:
      return state;
  }
}

export default shopequipmentReducer;
