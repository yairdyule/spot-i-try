import { NavLink } from "react-router-dom";
import type { IconType } from "react-icons";
import React from "react";

interface NavlinkProps {
  path: string;
  Child: IconType | React.ReactElement | string;
}

export default function Navlink({ path, Child }: NavlinkProps) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) => (isActive ? "text-emerald-300" : "")}
    >
      {Child}
    </NavLink>
  );
}
