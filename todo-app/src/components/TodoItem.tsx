import React, { useState } from 'react';
import '../styles/TodoItem.css';

interface TodoItemProps {
  id: number;
  task: string;
  completed: boolean;
  onToggle: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, completed, onToggle }) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleUndo = () => {
    setIsRemoving(true);
    setTimeout(onToggle, 500);
  };

  return (
    <li className={`todo-item ${isRemoving ? 'removed' : ''}`}>
      <div className="checkbox-wrapper">
        <input type="checkbox" checked={completed} onChange={handleUndo} />
      </div>
      <div className="task-wrapper">
        <span className={completed ? 'completed' : ''}>{task}</span>
      </div>
    </li>
  );
};

export default TodoItem;
