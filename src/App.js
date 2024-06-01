import { Routes, Route } from "react-router-dom";
import { Home, Login } from "./containers/Public"; // Removed Header as it's unused
import { AdminRoute, StaffRoute } from "./ProtectedRoute";
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
import StaffBill from "./containers/Public/TableLayout/StaffBill";
import StaffOrder from "./containers/Public/StaffOrder";
import DailyReport from "./containers/Public/DailyReport";
import ReportDaily from "./containers/Public/ReportDaily";
import TimeKeeping from "./containers/Public/TimeKeeping";
function App() {
  return (
    <div className="h-screen w-screen bg-primary">
      <Routes>
        {/* AllUSER */}
        <Route path={path.HOME} element={<Home />} />
        <Route path={path.LOGIN} element={<Login />} />

        {/* ADMIN */}
        <Route
          path={path.STORAGE}
          element={
            <AdminRoute>
              <Storage />
            </AdminRoute>
          }
        />
        <Route
          path={path.STATICTICAL_STORAGE}
          element={
            <AdminRoute>
              <StaticticalStorage />
            </AdminRoute>
          }
        />
        <Route
          path={path.DAILYREPORT}
          element={
            <AdminRoute>
              <ReportDaily />
            </AdminRoute>
          }
        />
        <Route
          path={path.TIMEKEEPING}
          element={
            <AdminRoute>
              <TimeKeeping />
            </AdminRoute>
          }
        />
        <Route
          path={path.COFFEETOOLS}
          element={
            <AdminRoute>
              <CoffeeBrewingTools />
            </AdminRoute>
          }
        />
        <Route
          path={path.DRINK}
          element={
            <AdminRoute>
              <Drink />
            </AdminRoute>
          }
        />
        <Route
          path={path.STAFF}
          element={
            <AdminRoute>
              <Staff />
            </AdminRoute>
          }
        />
        <Route
          path={path.ROLE}
          element={
            <AdminRoute>
              <Role />
            </AdminRoute>
          }
        />
        <Route
          path={path.RECIPE}
          element={
            <AdminRoute>
              <Recipe />
            </AdminRoute>
          }
        />
        <Route
          path={path.INGREDIENT}
          element={
            <AdminRoute>
              <Ingredient />
            </AdminRoute>
          }
        />
        <Route
          path={path.SHOPEQUIPMENT}
          element={
            <AdminRoute>
              <ShopEquipment />
            </AdminRoute>
          }
        />
        <Route
          path={path.USER}
          element={
            <AdminRoute>
              <User />
            </AdminRoute>
          }
        />
        <Route
          path={path.BILL}
          element={
            <AdminRoute>
              <Bill />
            </AdminRoute>
          }
        />
        <Route
          path={path.MENU}
          element={
            <AdminRoute>
              <MenuDrink />
            </AdminRoute>
          }
        />
        <Route
          path={path.EQUIPTYPE}
          element={
            <AdminRoute>
              <EquipmentType />
            </AdminRoute>
          }
        />
        <Route
          path={path.STATICTICAL}
          element={
            <AdminRoute>
              <Statictical />
            </AdminRoute>
          }
        />

        {/* STAFF */}
        <Route
          path={path.STAFF_BILL}
          element={
            <StaffRoute>
              <StaffBill />
            </StaffRoute>
          }
        />
        <Route
          path={path.STAFF_REPORT}
          element={
            <StaffRoute>
              <DailyReport />
            </StaffRoute>
          }
        />
        <Route
          path={path.STAFF_ORDER}
          element={
            <StaffRoute>
              <StaffOrder />
            </StaffRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
