// rootReducer.js
import { combineReducers } from "@reduxjs/toolkit";
import staffReducer from "./staffReducer";
import drinkReducer from "./drinkReducer";
import RoleReducer from "./roleReducer";
import ingredientReducer from "./ingredientReducer";
import storageReducer from "./storageReducer";
import recipeReducer from "./recipeReducer";
import coffebrewingtoolsReducer from "./coffebrewingtoolsReducer";
import shopequipmentReducer from "./shopequipmentReducer";
import UserReducer from "./UserReducer";
import BillReducer from "./BillReducer";
import MenuReducer from "./menuReducer";
import equipmentTypeReducer from "./equipmentTypeReducer";
import menuDetailReducer from "./menuDetailReducer";
import staticticalReducer from "./staticticalReducer";
// Import other reducers here and add them below

const rootReducer = combineReducers({
  staff: staffReducer,
  drink: drinkReducer,
  role: RoleReducer,
  storage: storageReducer,
  recipe: recipeReducer,
  tools: coffebrewingtoolsReducer,
  ingredient: ingredientReducer,
  shop: shopequipmentReducer,
  user: UserReducer,
  bill: BillReducer,
  type: equipmentTypeReducer,
  menu: MenuReducer,
  menuDetail: menuDetailReducer,
  statictical: staticticalReducer,

  // other reducers go here
});

export default rootReducer;
