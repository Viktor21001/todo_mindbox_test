import React, { useEffect, useRef, useState } from 'react';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: { id: number; task: string; completed: boolean }[];
  onToggle: (id: number) => void;
  onEdit: (id: number, newTask: string) => void;
  onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onEdit,
  onDelete,
}) => {
  const [removingIds, setRemovingIds] = useState<number[]>([]);
  const ulRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (ulRef.current) {
      const listHeight = ulRef.current.scrollHeight;
      ulRef.current.style.maxHeight = `${listHeight}px`;
    }
  }, [todos.length]);

  const handleToggle = (id: number) => {
    setRemovingIds([...removingIds, id]);
    setTimeout(() => {
      setRemovingIds(removingIds.filter((removingId) => removingId !== id));
      onToggle(id);
    }, 500);
  };

  return (
    <ul className="todo-list" ref={ulRef}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          task={todo.task}
          completed={todo.completed}
          onToggle={() => handleToggle(todo.id)}
          onEdit={onEdit}
          onDelete={() => onDelete(todo.id)}
          className={removingIds.includes(todo.id) ? 'removing' : ''}
        />
      ))}
    </ul>
  );
};

export default TodoList;
