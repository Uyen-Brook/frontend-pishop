// src/components/sidebar/SidebarItem.tsx
import React from "react";
import type { Category } from "../../../types/index";
import { iconMap } from "../../shared/iconMap";
import { FaBox } from "react-icons/fa"; // Fallback icon

interface SidebarItemProps {
  category: Category;
  active?: boolean;
  onSelect: (id: number) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ category, active, onSelect }) => {
  const Icon = (iconMap as any)[category.icon] || FaBox; // Fallback to FaBox if icon not found

  return (
    <li
      className={`flex items-center px-3 py-3 cursor-pointer transition-all duration-150 border-l-4 border-transparent hover:bg-gray-100 hover:border-blue-500 ${
        active ? "bg-blue-50 border-blue-500 text-blue-800 font-semibold" : ""
      }`}
      title={category.description}
      onClick={() => onSelect(category.id)}
    >
      <Icon className="mr-3 text-lg w-6 text-center" />
      <span className="flex-1">{category.name}</span>
    </li>
  );
};

export default SidebarItem;

