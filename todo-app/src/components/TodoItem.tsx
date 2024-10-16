import React from 'react';
import '../styles/TodoItem.css';

interface TodoItemProps {
  id: number;
  task: string;
  completed: boolean;
  onToggle: () => void;
  className?: string;
}

const TodoItem: React.FC<TodoItemProps> = ({
  task,
  completed,
  onToggle,
  className,
}) => {
  return (
    <li className={`todo-item ${className}`}>
      <div className="checkbox-wrapper">
        <input type="checkbox" checked={completed} onChange={onToggle} />
      </div>
      <div className="task-wrapper">
        <span className={completed ? 'completed' : ''}>{task}</span>
      </div>
    </li>
  );
};

export default TodoItem;
