import type { Category } from "../../types/index";

interface Props {
  categories: Category[];
  onSelect: (categoryName: string) => void;
}

export default function MenuBar({ categories, onSelect }: Props) {
  return (
    <div className="w-full bg-gray-100 px-6 py-3 flex gap-4 overflow-x-auto">
      {categories.map((c) => (
        <button
          key={c.id}
          onClick={() => onSelect(c.name)}
          className="px-4 py-2 bg-white shadow rounded hover:bg-blue-100"
        >
          {c.name}
        </button>
      ))}
    </div>
  );
}
