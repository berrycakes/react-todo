import { memo, useCallback, useEffect, useState } from 'react';
import '../App.css';
import useStore, { Todo } from '../store';

type TodoItemProps = {
  todo: Todo;
};

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

const TodoItem = (props: TodoItemProps) => {
  const { todo } = props;
  const { todoList, setTodoList } = useStore();
  const [description, setDescription] = useState(todo.description);
  const debouncedValue = useDebounce(description, 500);

  const updateTodo = useCallback(
    (id: number, description: string) => {
      setTodoList(
        todoList.map(todo => ({
          ...todo,
          description: todo.id === id ? description : todo.description,
        })),
      );
    },
    [todoList, setTodoList],
  );

  const toggleTodo = useCallback(
    (id: number) => {
      setTodoList(
        todoList.map(todo => ({
          ...todo,
          isDone: todo.id === id ? !todo.isDone : todo.isDone,
        })),
      );
    },
    [todoList, setTodoList],
  );

  const deleteTodo = useCallback(
    (id: number) => setTodoList(todoList.filter(todo => todo.id !== id)),
    [todoList, setTodoList],
  );

  // replace in-line anonymous fn with callback fn
  const onToggle = useCallback(() => {
    toggleTodo(todo.id);
  }, [toggleTodo, todo.id]);

  const onDelete = useCallback(() => {
    deleteTodo(todo.id);
  }, [deleteTodo, todo.id]);

  useEffect(() => {
    updateTodo(todo.id, debouncedValue);
  }, [debouncedValue]);

  return (
    <>
      <input
        type="checkbox"
        name="checkbox"
        checked={todo.isDone}
        onChange={onToggle}
        // used onChange instead of onClick to resolve console error
      />
      <input
        type="text"
        className="textInput"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button onClick={onDelete}>Delete</button>
    </>
  );
};

export default memo(TodoItem);
