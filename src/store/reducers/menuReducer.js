const initialState = {
  menuList: [],
};

function MenuReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_MENU_SUCCESS":
      return {
        ...state,
        menuList: action.payload,
      };
    default:
      return state;
  }
}

export default MenuReducer;
