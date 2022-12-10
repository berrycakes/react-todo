import { memo, useCallback, useEffect, useState } from 'react';
import '../App.css';
import useStore, { Todo } from '../store';
import shallow from 'zustand/shallow';

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

const TodoItem = ({ todo }: TodoItemProps) => {
  const [updateTodo, toggleTodo, deleteTodo] = useStore(
    ({ updateTodo, toggleTodo, deleteTodo }) => [
      updateTodo,
      toggleTodo,
      deleteTodo,
    ],
    shallow,
  );

  const [description, setDescription] = useState(todo.description);
  const debouncedValue = useDebounce(description, 500);

  // replace in-line anonymous fn with callback fn
  const onToggle = useCallback(() => {
    toggleTodo(todo.id);
  }, [todo.id]);

  const onDelete = useCallback(() => {
    deleteTodo(todo.id);
  }, [todo.id]);

  useEffect(() => {
    updateTodo(todo.id, debouncedValue);
  }, [debouncedValue]);

  console.log('item render/re-render with id:', todo.id);
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
