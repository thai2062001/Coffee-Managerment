// rootReducer.js
import { combineReducers } from "@reduxjs/toolkit";
import staffReducer from "./staffReducer";
import drinkReducer from "./drinkReducer";
import ingredientReducer from "./ingredientReducer";
// Import other reducers here and add them below

const rootReducer = combineReducers({
  staff: staffReducer,
  drink: drinkReducer,
  ingredient: ingredientReducer,
  // other reducers go here
});

export default rootReducer;
