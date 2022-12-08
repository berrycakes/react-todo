import create from 'zustand';
import { persist } from 'zustand/middleware';

export type Todo = {
  id: number;
  description: string;
  isDone: boolean;
};

type Store = {
  todoList: Todo[];
  setTodoList: (todoList: Todo[]) => void;
};

// todoList and setTodoList are made available globally using useStore hook
const useStore = create<Store>()(
  // persist store value so that it can be retrieved evenafter browser refresh
  persist(
    set => ({
      todoList: [],
      setTodoList: (newList: Todo[]) => set({ todoList: newList }),
    }),
    {
      name: 'todo-storage',
    },
  ),
);

export default useStore;
