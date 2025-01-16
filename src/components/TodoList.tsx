import React from 'react';
import { Todo } from '../models/Todo';
import TodoItem from './TodoItem';
interface Props {
  todos: Todo[];
  toggleComplete: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, newText: string) => void;
}

const TodoList: React.FC<Props> = ({ todos, toggleComplete, deleteTodo, updateTodo }) => {
  return (
    <div className="mt-4">
      {todos.length > 0 ? (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ))
      ) : (
        <p className="text-center text-muted">There are no tasks currently &#128512;</p>
      )}
    </div>
  );
};

export default TodoList;
