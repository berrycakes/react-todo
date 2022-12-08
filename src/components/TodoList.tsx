import React from 'react';
import useStore, { Todo } from '../store';
import '../App.css';

const TodoList = () => {
  // get and set todolist from global store
  const { todoList, setTodoList } = useStore();

  // iterate through todoList and replace with updated description
  const updateTodo = (id: number, description: string) => {
    setTodoList(
      todoList.map(todo => ({
        ...todo,
        description: todo.id === id ? description : todo.description,
      })),
    );
  };

  // iterate through todoList and toggle the value of isDone
  const toggleTodo = (id: number) =>
    setTodoList(
      todoList.map(todo => ({
        ...todo,
        isDone: todo.id === id ? !todo.isDone : todo.isDone,
      })),
    );

  // set new todoList to the result of filtered todo[]
  const deleteTodo = (id: number) =>
    setTodoList(todoList.filter(todo => todo.id !== id));

  return (
    <ul>
      {todoList.map((todo: Todo) => (
        <div className="todoItem" key={todo.id}>
          <input
            type="checkbox"
            name="checkbox"
            checked={todo.isDone}
            onClick={() => toggleTodo(todo.id)}
          />
          <input
            type="text"
            className="textInput"
            value={todo.description}
            onChange={e => {
              updateTodo(todo.id, e.target.value);
            }}
          />
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
      ))}
    </ul>
  );
};

export default TodoList;
