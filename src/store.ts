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
  updateTodo: (id: number, description: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
};

// todoList and setTodoList are made available globally using useStore hook
const useStore = create<Store>()(
  // persist store value so that it can be retrieved evenafter browser refresh
  persist(
    set => ({
      todoList: [],
      setTodoList: (todoList: Todo[]) =>
        set(state => ({
          ...state,
          todoList,
        })),
      deleteTodo: (id: number) =>
        set(state => {
          const newToDoList = state.todoList.filter(todo => todo.id !== id);
          return {
            ...state,
            todoList: newToDoList,
          };
        }),
      updateTodo: (id: number, description: string) =>
        set(state => {
          const updatedTodo = state.todoList.map(todo => {
            if (todo.id === id) {
              return {
                ...todo,
                description: description,
              };
            }
            return todo;
          });

          return {
            ...state,
            todoList: updatedTodo,
          };
        }),
      toggleTodo: (id: number) =>
        set(state => {
          const updatedTodo = state.todoList.map(todo => ({
            ...todo,
            isDone: todo.id === id ? !todo.isDone : todo.isDone,
          }));
          return {
            ...state,
            todoList: updatedTodo,
          };
        }),
    }),
    {
      name: 'todo-storage',
    },
  ),
);

export default useStore;
