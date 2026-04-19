// src/components/sidebar/Sidebar.tsx
import React from "react";
import type { Category } from "../../../types/index";
import SidebarItem from "./SideBarItemV2";
import "./SideBarV2.css"

interface SidebarProps {
  categories: Category[];
  activeCategory?: string;
  onSelect: (name: string) => void;
}

const SidebarV2: React.FC<SidebarProps> = ({ categories, activeCategory, onSelect }) => {
  return (
    <aside className="sidebar">
      <h2>DANH MỤC</h2>
      <ul className="category-list">
        {categories.map((cat) => (
          <SidebarItem
            key={cat.id}
            category={cat}
            active={cat.name === activeCategory}
            onSelect={onSelect}
          />
        ))}
      </ul>
      <div className="status">
        <span className="status-dot"></span> Pulse Active
      </div>
    </aside>
  );
};

export default SidebarV2;
