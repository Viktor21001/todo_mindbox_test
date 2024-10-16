import React from 'react';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: { id: number; task: string; completed: boolean }[];
  onToggle: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          task={todo.task}
          completed={todo.completed}
          onToggle={() => onToggle(todo.id)}
        />
      ))}
    </ul>
  );
};

export default TodoList;
