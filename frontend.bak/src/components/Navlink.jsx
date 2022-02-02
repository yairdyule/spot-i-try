import { NavLink } from "react-router-dom";

export default function Navlink({ path, Icon }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) => (isActive ? "text-emerald-300" : undefined)}
    >
      {Icon}
    </NavLink>
  );
}
