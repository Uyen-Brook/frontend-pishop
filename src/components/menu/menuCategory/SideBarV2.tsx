// src/components/sidebar/Sidebar.tsx
import React from "react";
import type { Category } from "../../../types/index";
import SidebarItem from "./SideBarItemV2";

interface SidebarProps {
  categories: Category[];
  activeCategory?: number;
  onSelect: (id: number) => void;
}

const SidebarV2: React.FC<SidebarProps> = ({ categories, activeCategory, onSelect }) => {
  return (
    <aside className="w-full bg-white border-r border-gray-200 rounded-none h-full sticky top-0 overflow-y-auto">
      <h2 className="mx-5 mb-5 text-base font-bold text-gray-800 uppercase tracking-wider">DANH MỤC</h2>
      <ul className="list-none p-0 m-0">
        {categories.map((cat) => (
          <SidebarItem
            key={cat.id}
            category={cat}
            active={cat.id === activeCategory}
            onSelect={onSelect}
          />
        ))}
      </ul>
      <div className="mt-8 px-5 text-xs flex items-center text-gray-400">
        <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span> Pulse Active
      </div>
    </aside>
  );
};

export default SidebarV2;
