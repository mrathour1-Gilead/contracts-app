interface SidebarItem {
  key: string;
  label: string;
}

export const DropdownTypeSidebar = ({
  selected,
  onSelect,
  options,
}: {
  selected: string;
  onSelect: (val: string) => void;
  options: SidebarItem[];
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 self-stretch flex flex-col w-64">
      <nav className="py-2 flex-1 overflow-auto">
        {options.map((item, index) => {
          const isActive = selected === item.key;

          return (
            <div
              key={item.key}
              onClick={() => onSelect(item.key)}
              className={`
                relative py-3 px-6 transition-all duration-300 ease-in-out cursor-pointer
                ${
                  isActive
                    ? "bg-gray-100 border-l-4 border-l-[#dc2626] text-gray-900 rounded-l-md"
                    : "text-gray-600 hover:bg-gray-50"
                }
              `}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`text-sm ${
                    isActive ? "font-medium" : "font-normal"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            </div>
          );
        })}
      </nav>
    </div>
  );
};