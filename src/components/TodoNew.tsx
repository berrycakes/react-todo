import { useState } from 'react';
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
        id: todoList.reduce((maxId, todo) => Math.max(maxId, todo.id), 0) + 1,
        // 1. if you were to refactor the above code, generating the id,
        //    how would you do it? No need to change the way you
        //    generate the id
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
   * */

  return (
    <form className="todoItem">
      <input
        type="text"
        value={description}
        onChange={e => {
          setDescription(e.target.value);
        }}
        className="textInput"
      />
      <button type="submit" onClick={() => addTodo(description)}>
        Create
      </button>
    </form>
  );
};

export default TodoNew;
