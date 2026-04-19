// src/components/sidebar/SidebarItem.tsx
import React from "react";
import type { Category } from "../../../types/index";
import "./SideBarV2.css";
import { iconMap } from "../../shared/iconMap";



interface SidebarItemProps {
  category: Category;
  active?: boolean;
  onSelect: (name: string) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ category, active, onSelect }) => {
  const Icon = (iconMap as any)[category.icon];
  return (
    <li
      className={`category-item ${active ? "active" : ""}`}
      title={category.description}
      onClick={() => onSelect(category.name)}
    >
      <Icon className ="i"/>
      <span className="name">{category.name}</span>
    </li> 
  );
};

export default SidebarItem;

