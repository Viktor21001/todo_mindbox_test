# Описание тестов для ToDo-приложения

В данном файле описаны тесты, которые были реализованны для ToDo-приложения. Эти тесты проверяют ключевые функции приложения, такие как добавление, редактирование, удаление и завершение задач.

## Описание тестов:

### 1. Тест на добавление новой задачи

**Цель:** Проверить, что новая задача корректно добавляется в список при вводе текста и нажатии клавиши `Enter`.

- Пользователь вводит текст задачи в поле ввода.
- По нажатию клавиши `Enter`, задача должна появиться в списке задач.
- Тест проверяет, что задача отображается на экране после добавления.

Этот тест важен, так как добавление задачи — это ключевая функциональность ToDo-приложения, и корректное добавление задачи необходимо для правильной работы приложения.

### 2. Тест на изменение статуса задачи (выполненная задача)

**Цель:** Проверить, что задача может быть отмечена как выполненная путем клика на чекбокс, и статус задачи изменяется.

- Пользователь добавляет задачу и видит её в списке с незаполненным чекбоксом.
- Пользователь кликает на чекбокс, и задача становится помеченной как выполненная.
- Тест проверяет, что чекбокс изменяет состояние на "отмеченный" после клика.

Тест на переключение состояния задачи является важным для подтверждения корректной работы механизма изменения статуса выполнения задачи. 

### 3. Тест на редактирование задачи

**Цель:** Проверить возможность редактирования задачи.

- Пользователь двойным кликом на задачу включает режим редактирования.
- Поле ввода заменяет текст задачи, и пользователь может изменить её.
- После изменения текста и выхода из режима редактирования, задача должна отображаться с обновлённым текстом.
  
Редактирование задачи — важная функция, которая позволяет пользователям обновлять информацию без необходимости удалять задачу. Этот тест помогает убедиться, что функция редактирования работает корректно.

### 4. Тест на удаление задачи

**Цель:** Проверить, что задача корректно удаляется при нажатии на кнопку удаления.

- Пользователь добавляет задачу и видит её в списке.
- Пользователь нажимает на кнопку удаления (иконка `×`), и задача исчезает из списка.
- Тест проверяет, что задача больше не отображается на экране после удаления.

Удаление задачи — это важная операция для любого ToDo-приложения, которая позволяет пользователям удалять ненужные задачи. Этот тест гарантирует, что функция удаления работает правильно и задачи корректно удаляются из списка.

---

Эти тесты покрывают основные функциональные требования для ToDo-приложения, проверяя правильность работы ключевых функций: добавление, редактирование, удаление и изменение статуса задачи.
