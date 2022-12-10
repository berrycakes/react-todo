import TodoNew from './components/TodoNew';
import TodoList from './components/TodoList';
import './App.css';
import useStore from './store';

function App() {
  const { todoList } = useStore();
  return (
    <div className="App">
      <h1>To-do App</h1>
      <div className="container">
        <TodoNew />
        <TodoList todoList={todoList} />
        <pre>{JSON.stringify(todoList, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
