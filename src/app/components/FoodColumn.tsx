import { ITodoList } from "@/app/model/TodoModel";

const FoodColumn = ({
  type,
  items,
  onRemove,
  }: {
  type: string;
  items: ITodoList[];
  onRemove: (todo: ITodoList) => void;
}) => {
  return (
      <div className="pt-[135px]">
        <div className="rounded-t-md border border-black h-[40px] flex justify-center items-center bg-gray-300">
            {type}
        </div>
        <div className="rounded-b-md border-x border-b border-black h-[580px]">
            {items
            .filter((item) => item.type === type)
            .map((item, index) => (
              <div key={index} className="flex justify-center pt-2">
              <button
                className="w-[220px] bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                onClick={() => onRemove(item)}
              >
                {item.name}
              </button>
            </div>
            ))}
        </div>
      </div>
  );
};

export default FoodColumn;