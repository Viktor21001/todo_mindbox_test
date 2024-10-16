import { render, fireEvent } from '@testing-library/react';
import App from '../App';

test('can add a new todo', () => {
  const { getByPlaceholderText, getByText } = render(<App />);

  // Ищем поле для ввода задачи
  const input = getByPlaceholderText('What needs to be done?');

  // Добавляем новую задачу
  fireEvent.change(input, { target: { value: 'New Task' } });
  fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });

  // Проверяем, что задача была добавлена в список
  expect(getByText('New Task')).toBeInTheDocument();
});

test('can toggle todo completion', () => {
  const { getByPlaceholderText, getByText, getByRole } = render(<App />);

  // Ищем поле для ввода задачи
  const input = getByPlaceholderText('What needs to be done?');

  // Добавляем новую задачу
  fireEvent.change(input, { target: { value: 'New Task' } });
  fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });

  // Ищем добавленную задачу
  const checkbox = getByRole('checkbox');
  const task = getByText('New Task');

  // Проверяем, что задача не выполнена
  expect(checkbox).not.toBeChecked();

  // Имитируем нажатие на чекбокс (выполнение задачи)
  fireEvent.click(checkbox);

  // Проверяем, что задача выполнена
  expect(checkbox).toBeChecked();
});

test('can filter active and completed todos', () => {
  const { getByPlaceholderText, getByText, getByRole, getByTestId } = render(
    <App />
  );

  // Ищем поле для ввода задачи
  const input = getByPlaceholderText('What needs to be done?');

  // Добавляем две задачи
  fireEvent.change(input, { target: { value: 'Task 1' } });
  fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });
  fireEvent.change(input, { target: { value: 'Task 2' } });
  fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });

  // Выполняем первую задачу
  const checkbox = getByRole('checkbox');
  fireEvent.click(checkbox); // Завершаем первую задачу

  // Фильтрация: Completed
  fireEvent.click(getByText('Completed'));
  expect(getByText('Task 1')).toBeInTheDocument(); // "Task 1" должна быть видна
  expect(() => getByText('Task 2')).toThrow(); // "Task 2" не должна быть видна

  // Фильтрация: Active
  fireEvent.click(getByText('Active'));
  expect(getByText('Task 2')).toBeInTheDocument(); // "Task 2" должна быть видна
  expect(() => getByText('Task 1')).toThrow(); // "Task 1" не должна быть видна
});

test('can clear completed todos', () => {
  const { getByPlaceholderText, getByText, getByRole, queryByText } = render(
    <App />
  );

  // Ищем поле для ввода задачи
  const input = getByPlaceholderText('What needs to be done?');

  // Добавляем две задачи
  fireEvent.change(input, { target: { value: 'Task 1' } });
  fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });
  fireEvent.change(input, { target: { value: 'Task 2' } });
  fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });

  // Выполняем обе задачи
  const checkbox1 = getByRole('checkbox', { name: /Task 1/i });
  fireEvent.click(checkbox1);

  const checkbox2 = getByRole('checkbox', { name: /Task 2/i });
  fireEvent.click(checkbox2);

  // Имитируем нажатие на кнопку "Clear completed"
  fireEvent.click(getByText('Clear completed'));

  // Проверяем, что завершенные задачи были удалены
  expect(queryByText('Task 1')).toBeNull();
  expect(queryByText('Task 2')).toBeNull();
});
