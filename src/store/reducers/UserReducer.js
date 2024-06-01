const initialState = {
  userList: [],
  userExistList: [],
};

function UserReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_USER_SUCCESS":
      return {
        ...state,
        userList: action.payload,
      };
    case "FETCH_USER_EXIST_SUCCESS":
      return {
        ...state,
        userExistList: action.payload,
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
