import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoItem from '../components/TodoItem';

describe('TodoItem Component', () => {
  const mockToggle = jest.fn();
  const mockEdit = jest.fn();
  const mockDelete = jest.fn();
  const todo = { id: 1, task: 'Test Task', completed: false };

  test('renders task correctly', () => {
    const { getByText } = render(
      <TodoItem
        id={todo.id}
        task={todo.task}
        completed={todo.completed}
        onToggle={mockToggle}
        onEdit={mockEdit}
        onDelete={mockDelete}
      />
    );

    expect(getByText(todo.task)).toBeInTheDocument();
  });

  test('toggles task completed status', () => {
    const { getByRole } = render(
      <TodoItem
        id={todo.id}
        task={todo.task}
        completed={todo.completed}
        onToggle={mockToggle}
        onEdit={mockEdit}
        onDelete={mockDelete}
      />
    );

    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockToggle).toHaveBeenCalled();
  });

  test('deletes the task', () => {
    const { getByText } = render(
      <TodoItem
        id={todo.id}
        task={todo.task}
        completed={todo.completed}
        onToggle={mockToggle}
        onEdit={mockEdit}
        onDelete={mockDelete}
      />
    );

    const deleteButton = getByText('×');
    fireEvent.click(deleteButton);

    expect(mockDelete).toHaveBeenCalled();
  });

  test('edits the task', () => {
    const { getByText, getByDisplayValue } = render(
      <TodoItem
        id={todo.id}
        task={todo.task}
        completed={todo.completed}
        onToggle={mockToggle}
        onEdit={mockEdit}
        onDelete={mockDelete}
      />
    );

    const taskElement = getByText(todo.task);
    fireEvent.doubleClick(taskElement);

    const input = getByDisplayValue(todo.task);
    fireEvent.change(input, { target: { value: 'Updated Task' } });
    fireEvent.blur(input);

    expect(mockEdit).toHaveBeenCalledWith(todo.id, 'Updated Task');
  });
});
