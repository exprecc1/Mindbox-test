import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from './TodoList';
import { Todo } from '../types/todo';

describe('TodoList Component', () => {
  const todos: Todo[] = [
    { id: '1', text: 'Задача 1', completed: false },
    { id: '2', text: 'Задача 2', completed: true },
  ];

  test('отображает список задач', () => {
    const toggleTodoMock = jest.fn();
    render(<TodoList todos={todos} toggleTodo={toggleTodoMock} />);

    expect(screen.getByText('Задача 1')).toBeInTheDocument();
    expect(screen.getByText('Задача 2')).toBeInTheDocument();
  });

  test('переключает статус задачи при клике', () => {
    const toggleTodoMock = jest.fn();
    render(<TodoList todos={todos} toggleTodo={toggleTodoMock} />);

    const task1 = screen.getByText('Задача 1');
    fireEvent.click(task1);

    expect(toggleTodoMock).toHaveBeenCalledWith('1');
  });
});
