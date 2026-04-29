import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as Md from "react-icons/md";
import { iconMap } from "../../../shared/iconMap";

export interface MenuItem {
  name: string;
  icon: string;
  path: string;
}

interface ItemProps {
  item: MenuItem;
  active: boolean;
  onClick: () => void;
}

const ProfileMenuItem = ({ item, active, onClick }: ItemProps) => {
  const Icon = (iconMap as any)[item.icon] || Md.MdCircle;

  return (
    <li
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 cursor-pointer border-l-4 transition-all
        ${
          active
            ? "bg-[#F42525]/10 border-[#F42525] text-[#F42525] font-semibold"
            : "border-transparent text-gray-600 hover:bg-gray-100 hover:border-[#F42525]/40"
        }`}
    >
      <Icon className="text-lg w-5" />
      <span className="flex-1 text-sm">{item.name}</span>
    </li>
  );
};

export default ProfileMenuItem;