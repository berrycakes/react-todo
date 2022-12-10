import React, { FormEvent, useState } from 'react';
import useStore from '../store';
import '../App.css';

const TodoNew = () => {
  /*
   * 0. optimize if possible*
   * */

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
        id: Math.max(0, Math.max(...todoList.map(({ id }) => id))) + 1,
        // 1. if you were to refactor the above code, generating the id,
        //    how would you do it? No need to change the way you
        //    generate the id
        // -- instead of using reduce, i mapped through the list to generate an array of IDs
        // and got the max number of the array using Math.max
        // -- return 0 when array is empty
        description,
        isDone: false,
      },
    ]);
    setDescription('');
  };

  /*
   * 2. I added a form element to support submit on enter.
   *    This will introduce unusual behavior, add the necessary code
   *    to make this working the way it should be.
   * -- I created the following function to prevent the form from submitting
   * */

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    addTodo(description);
  };

  return (
    <form className="todoItem" onSubmit={onSubmit}>
      <input
        type="text"
        value={description}
        onChange={e => {
          setDescription(e.target.value);
        }}
        className="textInput"
      />
      <button type="submit" onClick={onSubmit}>
        Create
      </button>
    </form>
  );
};

export default TodoNew;
