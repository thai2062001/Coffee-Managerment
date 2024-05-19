const initialState = {
  equipType: [],
};

function equipmentTypeReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_EQUIPMENT_TYPE_SUCCESS":
      return {
        ...state,
        equipType: action.payload,
      };
    default:
      return state;
  }
}

export default equipmentTypeReducer;
