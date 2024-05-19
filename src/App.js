import { Routes, Route } from "react-router-dom";
import { Home, Login, Header } from "./containers/Public"; // Header seems unused?
import { path } from "./ultils/constant";
import Storage from "./containers/Public/Storage";
import CoffeeBrewingTools from "./containers/Public/CoffeeBrewingTools";
import Staff from "./containers/Public/Staff";
import Drink from "./containers/Public/Drink";
import Role from "./containers/Public/Role";
import Recipe from "./containers/Public/Recipe";
import Ingredient from "./containers/Public/Ingredient";
import ShopEquipment from "./containers/Public/ShopEquipment";
import User from "./containers/Public/User";
import Bill from "./containers/Public/Bill";
import MenuDrink from "./containers/Public/MenuDrink";
import EquipmentType from "./containers/Public/EquipmentType";
import Statictical from "./containers/Public/Statictical";
import StaticticalStorage from "./containers/Public/StaticticalStorage";
function App() {
  return (
    <div className="h-screen w-screen bg-primary">
      <Routes>
        <Route path={path.HOME} element={<Home />}></Route>
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.STORAGE} element={<Storage />} />
        <Route path={path.COFFEETOOLS} element={<CoffeeBrewingTools />} />
        <Route path={path.DRINK} element={<Drink />} />
        <Route path={path.STAFF} element={<Staff />} />
        <Route path={path.ROLE} element={<Role />} />
        <Route path={path.RECIPE} element={<Recipe />} />
        <Route path={path.INGREDIENT} element={<Ingredient />} />
        <Route path={path.SHOPEQUIPMENT} element={<ShopEquipment />} />
        <Route path={path.USER} element={<User />} />
        <Route path={path.BILL} element={<Bill />} />
        <Route path={path.MENU} element={<MenuDrink />} />
        <Route path={path.EQUIPTYPE} element={<EquipmentType />} />
        <Route path={path.STATICTICAL} element={<Statictical />} />
        <Route
          path={path.STATICTICAL_STORAGE}
          element={<StaticticalStorage />}
        />
      </Routes>
    </div>
  );
}

export default App;
