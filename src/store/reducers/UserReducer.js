const initialState = {
  userList: [],
};

function UserReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_USER_SUCCESS":
      return {
        ...state,
        userList: action.payload,
      };
    case "ADD_USER":
      return {
        ...state,
        userList: [...state.userList, action.payload],
      };
    default:
      return state;
  }
}

export default UserReducer;
