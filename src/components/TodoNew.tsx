import React, { useState } from 'react';
import useStore from '../store';
import '../App.css';

const TodoNew = () => {
  // get and set todolist from global store
  const { todoList, setTodoList } = useStore();
  // get and set the description for creating new todo item
  const [description, setDescription] = useState('');

  // add the new todo object to the global store todolist using the user input description as parameter
  const addTodo = (description: string) => {
    setTodoList([
      ...todoList,
      {
        // find the latest id and add 1
        id: todoList.reduce((maxId, todo) => Math.max(maxId, todo.id), 0) + 1,
        description,
        isDone: false,
      },
    ]);
    setDescription('');
  };

  return (
    <div className="todoItem">
      <input
        type="text"
        value={description}
        onChange={e => {
          setDescription(e.target.value);
        }}
        className="textInput"
      />
      <button onClick={() => addTodo(description)}>Create</button>
    </div>
  );
};

export default TodoNew;
