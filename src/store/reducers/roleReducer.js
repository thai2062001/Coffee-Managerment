const initialState = {
  roleList: [],
};

function RoleReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_ROLE_SUCCESS":
      return {
        ...state,
        roleList: action.payload,
      };
    case "ADD_ROLE":
      return {
        ...state,
        roleList: [...state.roleList, action.payload],
      };
    default:
      return state;
  }
}

export default RoleReducer;
