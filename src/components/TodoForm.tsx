import React, { useState } from 'react';

interface Props {
  addTodo: (text: string) => void;
}

const TodoForm: React.FC<Props> = ({ addTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex gap-2 w-100">
      <input
        className="form-control"
        type="text"
        placeholder="Add a new task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="btn btn-primary">Add Task</button>
    </form>
  );
};

export default TodoForm;
