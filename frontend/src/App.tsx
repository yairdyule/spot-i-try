import "./App.css";
import { NavLink, Outlet } from "react-router-dom";
import Navlink from "./components/Navlink";
import { AiOutlineLock, AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { MdPersonOutline } from "react-icons/md";

function App() {
  return (
    <div className="App">
      <nav className="flex flex-row gap-4 justify-center py-4 border-b-2 text-lg">
        <Navlink path="/authorize" Child={AiOutlineLock} />
        <Navlink path="/" Child={AiOutlineHome} />
        <Navlink path="/search" Child={AiOutlineSearch} />
        <Navlink path="/profile" Child={MdPersonOutline} />
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
