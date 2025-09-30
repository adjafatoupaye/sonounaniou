import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Jour1 from "./pages/Jour1";
import Jour2 from "./pages/Jour2";
import Jour3 from "./pages/Jour3";
import ChangePassword from "./pages/ChangePassword";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/jour1" element={<Jour1 />} />
        <Route path="/jour2" element={<Jour2 />} />
        <Route path="/jour3" element={<Jour3 />} />
        <Route path="/change-password" element={<ChangePassword />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
