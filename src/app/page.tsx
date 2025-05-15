'use client';
import { todoList } from '@/app/constants/TodoList';
import { ITodoList, TypeName } from '@/app/model';
import { useState, useEffect } from 'react';
import FoodColumn from '@/app/components/FoodColumn';

export default function Home() {
  const [todoLists, setTodoLists] = useState<ITodoList[]>(todoList);
  const [selectedTodo, setSelectedTodo] = useState<ITodoList[]>([]);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
  }, []);

  const onClickTodo = (todo: ITodoList) => {
    setTodoLists((val) => val.filter((value) => value.name !== todo.name));
    setSelectedTodo(val => [...val, todo])
    setTimeout(() => {
      setSelectedTodo(val => val.filter(e => e.name !== todo.name))
      setTodoLists(val => {
        const exists = (val.filter(e => e.name === todo.name)).length > 0
        if (!exists) {
          return [...val, todo]
        }
        return val
      })
    }, 5000)
  }

  const removeTodoList = (todo: ITodoList) => {
    setTodoLists(val => [...val, todo])
    setSelectedTodo(val => val.filter(e => e.name !== todo.name))
  }

  return (
    <div className="h-[100vh] grid grid-cols-3 gap-[16px] px-[16px]">
      <div className="pt-[135px] flex flex-col items-center gap-y-[16px]">
        {todoLists.length > 0 &&
          todoLists.map((todo, index) => {
            return (
              <div key={index}>
                <button
                  className="w-[220px] bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                  onClick={() => onClickTodo(todo)}
                >
                  {todo?.name}
                </button>
              </div>
            );
          })}
      </div>
      <FoodColumn
        type={TypeName.FRUIT}
        items={selectedTodo}
        onRemove={removeTodoList}
      />
      <FoodColumn
        type={TypeName.VEGETABLE}
        items={selectedTodo}
        onRemove={removeTodoList}
      />
    </div>
  );
}
