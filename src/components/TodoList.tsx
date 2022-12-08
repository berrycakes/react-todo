import useStore, { Todo } from '../store';
import '../App.css';
import { useCallback, useRef } from 'react';

const TodoList = () => {
  /*
   * you can ignore the code below, this just something that
   * I used to show the item being re-render each time you make
   * change on any of the item, see `data-render` in todo item
   * */
  let count = useRef(0).current;
  const createCount = useCallback(() => {
    count++;

    return count
  }, [count]);
  
  // get and set todolist from global store
  const { todoList, setTodoList } = useStore();
  /*
   * 1. there is a console warning, how can we resolve that?
   * 2. if you can optimize this app what would you? and;
   * 3. where you do start doing it?
   * 4. I added a line before the render/return to show that each time
   *    you make change, the component re-render which is usual, but,
   *    we can prevent everything from being re-render by....?
   * */

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

  console.count('component render');

  return (
    <ul>
      {todoList.map((todo: Todo) => (
        <div className="todoItem" key={todo.id} data-render={createCount()}>
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
