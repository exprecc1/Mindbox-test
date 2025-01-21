import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoInput from './TodoInput';

describe('TodoInput Component', () => {
  test('добавляет задачу при нажатии на кнопку', () => {
    const addTodoMock = jest.fn();
    render(<TodoInput addTodo={addTodoMock} />);

    const input = screen.getByPlaceholderText('Добавить новую задачу');
    const addButton = screen.getByText('Добавить');

    fireEvent.change(input, { target: { value: 'Новая задача' } });
    fireEvent.click(addButton);

    expect(addTodoMock).toHaveBeenCalledWith('Новая задача');
  });

  test('не добавляет пустую задачу', () => {
    const addTodoMock = jest.fn();
    render(<TodoInput addTodo={addTodoMock} />);

    const addButton = screen.getByText('Добавить');
    fireEvent.click(addButton);

    expect(addTodoMock).not.toHaveBeenCalled();
  });
});
