import React, { useState } from 'react';
import '../styles/TodoItem.css';

interface TodoItemProps {
  id: number;
  task: string;
  completed: boolean;
  onToggle: () => void;
  onEdit: (id: number, newTask: string) => void;
  onDelete: () => void;
  className?: string;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  task,
  completed,
  onToggle,
  onEdit,
  onDelete,
  className,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit(id, editedTask);
    setIsEditing(false);
  };

  return (
    <li className={`todo-item ${className}`}>
      <div className="checkbox-wrapper">
        <input type="checkbox" checked={completed} onChange={onToggle} />
      </div>

      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
            onBlur={handleEditSubmit}
            autoFocus
          />
        </form>
      ) : (
        <div className="task-wrapper" onDoubleClick={() => setIsEditing(true)}>
          <span className={completed ? 'completed' : ''}>{task}</span>
        </div>
      )}

      <button className="delete-button" onClick={onDelete}>
        ×
      </button>
    </li>
  );
};

export default TodoItem;
