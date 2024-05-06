import { Routes, Route } from "react-router-dom";
import { Home, Login, Header } from "./containers/Public"; // Header seems unused?
import { path } from "./ultils/constant";
import HeaderAnt from "./containers/Public/HeaderAnt";
import Content1 from "./containers/Public/Content1";
import Content2 from "./containers/Public/Content2";
import Staff from "./containers/Public/Staff";
import Drink from "./containers/Public/Drink";

function App() {
  return (
    <div className="h-screen w-screen bg-primary">
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path={path.LOGIN} element={<Login />} />
        </Route>

        <Route path={path.HEADERANT} element={<HeaderAnt />}></Route>
        <Route path={path.CONTENT1} element={<Content1 />} />
        <Route path={path.CONTENT2} element={<Content2 />} />
        <Route path={path.DRINK} element={<Drink />} />
        <Route path={path.STAFF} element={<Staff />} />
      </Routes>
    </div>
  );
}

export default App;
