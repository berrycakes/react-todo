import { Todo } from '../store';
import '../App.css';
import { useCallback, useRef } from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todoList }: { todoList: Todo[] }) => {
  /*
   * you can ignore the code below, this just something that
   * I used to show the item being re-render each time you make
   * change on any of the item, see `data-render` in todo item
   * */
  let count = useRef(0).current;
  const createCount = useCallback(() => {
    count++;

    return count;
  }, [count]);

  /*
   * 1. there is a console warning, how can we resolve that?
   * -- error indicates that onChange is missing so i supplied that.
   * 2. if you can optimize this app what would you? and;
   * 3. where you do start doing it?
   * -- I created a separate child component <TodoItem>
   * -- I also replaced the onChange anonymous fn with a separate function wrapped in useCallback
   * 4. I added a line before the render/return to show that each time
   *    you make change, the component re-render which is usual, but,
   *    we can prevent everything from being re-render by....?
   * --I tried memoizing the child component and wrapping the functions in useCallback
   * but that did not prevent re-rendering because its still dependent on todoList, so I added a custom useDebounce
   * hook to only update based on uer input every 500 ms
   * */

  console.count('component render');

  return (
    <ul>
      {todoList.map((todo: Todo) => (
        <div className="todoItem" key={todo.id} data-render={createCount()}>
          <TodoItem todo={todo} />
        </div>
      ))}
    </ul>
  );
};

export default TodoList;
