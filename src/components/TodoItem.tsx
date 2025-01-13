import React from 'react';
import { Todo } from '../models/Todo';
import 'bootstrap/dist/css/bootstrap.min.css';

interface TodoItemProps {
  todo: Todo;
  toggleComplete: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleComplete, deleteTodo, updateTodo }) => {
  
  return (
    <div className="card p-2 mb-3">
      <div className="d-flex justify-content-between align-items-center">
        
        <div className="d-flex align-items-center">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleComplete(todo.id)}
            className="form-check-input me-2"
          />
          <span
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? 'gray' : 'black'
            }}
          >
            {todo.text}
          </span>

          {todo.completed && (
            <span className="ms-2 badge bg-success">Completed</span>
          )}
        </div>

        <div>
          <button
            className="btn btn-warning me-2"
            onClick={() => {
              const newText = prompt('Edit your task:', todo.text);
              if (newText) updateTodo(todo.id, newText);
            }}
          >
            <i className="bi bi-pencil-square"></i>
          </button>

          <button
            className="btn btn-danger"
            onClick={() => deleteTodo(todo.id)}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
