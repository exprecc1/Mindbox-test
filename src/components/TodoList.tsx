import React from 'react';
import { Todo } from '../types/todo';

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: string) => void; // Изменяем тип id на string
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li
          key={todo.id}
          onClick={() => toggleTodo(todo.id)}
          className={todo.completed ? 'completed' : ''}
        >
          {todo.text}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
