import Navlink from "./Navlink";
import { AiOutlineLock, AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { MdPersonOutline } from "react-icons/md";

const Navbar = () => {
  return (
    <>
      <nav className="flex flex-row gap-4 justify-center py-4 border-b-2 border-emerald-300 text-xl bg-slate-emerald-800">
        <Navlink path="/authorize" Child={AiOutlineLock} />
        <Navlink path="/" Child={AiOutlineHome} />
        <Navlink path="/search" Child={AiOutlineSearch} />
        <Navlink path="/profile" Child={MdPersonOutline} />
      </nav>
    </>
  );
};

export default Navbar;
