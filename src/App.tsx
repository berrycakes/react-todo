import React from 'react';
import TodoNew from './components/TodoNew';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>To-do App</h1>
      <div className="container">
        <TodoNew />
        <TodoList />
      </div>
    </div>
  );
}

export default App;
