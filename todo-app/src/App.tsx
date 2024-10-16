import React, { useState } from 'react';
import TodoList from './components/TodoList';
import './styles/App.css';

interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

let nextId = 1;

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [newTask, setNewTask] = useState('');

  const addTodo = (task: string) => {
    if (task.trim()) {
      setTodos([...todos, { id: nextId++, task, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTodo = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const clearCompleted = () => {
    const activeTodos = todos.filter((todo) => !todo.completed);
    setTodos(activeTodos);
  };

  const getFilteredTodos = () => {
    return todos.filter((todo) => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    });
  };

  const filteredTodos = getFilteredTodos();

  const itemsLeft = todos.filter((todo) => !todo.completed).length;

  return (
    <div id="root">
      <h1>todos</h1>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && addTodo(newTask)}
      />
      <TodoList todos={filteredTodos} onToggle={toggleTodo} />

      <footer>
        <p>{itemsLeft} items left</p>
        <div className="filters">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={filter === 'active' ? 'active' : ''}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      </footer>
    </div>
  );
};

export default App;
