import { render, fireEvent } from '@testing-library/react';
import TodoItem from '../components/TodoItem';

test('renders todo item and toggles completion', () => {
  const task = 'Test task';
  const completed = false;
  const onToggle = jest.fn(); // Мокаем функцию onToggle

  const { getByText, getByRole } = render(
    <TodoItem id={1} task={task} completed={completed} onToggle={onToggle} />
  );

  const checkbox = getByRole('checkbox');
  const label = getByText(task);

  // Проверяем, что задача отображается и не выполнена
  expect(label).toBeInTheDocument();
  expect(checkbox).not.toBeChecked();

  // Имитируем нажатие на чекбокс
  fireEvent.click(checkbox);

  // Проверяем, что функция onToggle была вызвана
  expect(onToggle).toHaveBeenCalledTimes(1);
});
