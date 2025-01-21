import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('добавляет новую задачу', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Добавить новую задачу');
    const addButton = screen.getByText('Добавить');

    fireEvent.change(input, { target: { value: 'Новая задача' } });
    fireEvent.click(addButton);

    expect(screen.getByText('Новая задача')).toBeInTheDocument();
  });

  test('переключает статус задачи', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Добавить новую задачу');
    const addButton = screen.getByText('Добавить');

    fireEvent.change(input, { target: { value: 'Новая задача' } });
    fireEvent.click(addButton);

    const task = screen.getByText('Новая задача');
    fireEvent.click(task);

    expect(task).toHaveClass('completed');
  });

  test('фильтрует задачи по статусу', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Добавить новую задачу');
    const addButton = screen.getByText('Добавить');

    fireEvent.change(input, { target: { value: 'Задача 1' } });
    fireEvent.click(addButton);
    fireEvent.change(input, { target: { value: 'Задача 2' } });
    fireEvent.click(addButton);

    const task1 = screen.getByText('Задача 1');
    fireEvent.click(task1);

    const activeFilter = screen.getByText('Active');
    fireEvent.click(activeFilter);

    expect(screen.getByText('Задача 2')).toBeInTheDocument();
    expect(screen.queryByText('Задача 1')).not.toBeInTheDocument();
  });

  test('очищает выполненные задачи', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Добавить новую задачу');
    const addButton = screen.getByText('Добавить');

    fireEvent.change(input, { target: { value: 'Задача 1' } });
    fireEvent.click(addButton);
    fireEvent.change(input, { target: { value: 'Задача 2' } });
    fireEvent.click(addButton);

    const task1 = screen.getByText('Задача 1');
    fireEvent.click(task1);

    const clearCompletedButton = screen.getByText('Clear Completed');
    fireEvent.click(clearCompletedButton);

    expect(screen.queryByText('Задача 1')).not.toBeInTheDocument();
    expect(screen.getByText('Задача 2')).toBeInTheDocument();
  });
});
