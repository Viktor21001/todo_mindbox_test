import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { act } from 'react';

describe('Todo App', () => {
  test('should add a new todo', async () => {
    render(<App />);

    const inputElement = screen.getByPlaceholderText(/what needs to be done?/i);
    fireEvent.change(inputElement, { target: { value: 'New Task' } });
    fireEvent.keyPress(inputElement, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    });

    await waitFor(() => {
      const todoItem = screen.getByText(/New Task/i);
      expect(todoItem).toBeInTheDocument();
    });
  });

  test('should toggle todo completed status', async () => {
    render(<App />);

    const inputElement = screen.getByPlaceholderText(/what needs to be done?/i);
    fireEvent.change(inputElement, { target: { value: 'New Task' } });
    fireEvent.keyPress(inputElement, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    });

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    act(() => {
      fireEvent.click(checkbox);
    });

    await waitFor(() => {
      expect(checkbox).toBeChecked();
    });
  });

  test('should edit a todo', async () => {
    render(<App />);

    const inputElement = screen.getByPlaceholderText(/what needs to be done?/i);
    fireEvent.change(inputElement, { target: { value: 'Task to Edit' } });
    fireEvent.keyPress(inputElement, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    });

    const taskElement = screen.getByText(/Task to Edit/i);
    fireEvent.doubleClick(taskElement);

    const editInput = screen.getByDisplayValue(/Task to Edit/i);
    fireEvent.change(editInput, { target: { value: 'Updated Task' } });
    fireEvent.blur(editInput);

    await waitFor(() => {
      expect(screen.queryByText(/Task to Edit/i)).not.toBeInTheDocument();
      expect(screen.getByText(/Updated Task/i)).toBeInTheDocument();
    });
  });

  test('should delete a todo', async () => {
    render(<App />);

    const inputElement = screen.getByPlaceholderText(/what needs to be done?/i);
    fireEvent.change(inputElement, { target: { value: 'Task to Delete' } });
    fireEvent.keyPress(inputElement, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    });

    const taskElement = screen.getByText(/Task to Delete/i);
    expect(taskElement).toBeInTheDocument();

    const deleteButton = screen.getByText('×');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText(/Task to Delete/i)).not.toBeInTheDocument();
    });
  });
});
