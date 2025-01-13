import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { Todo } from './models/Todo';
import toast, { Toaster } from 'react-hot-toast';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import todoIcon from './assets/todo.gif';

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem('todos');
      return storedTodos ? JSON.parse(storedTodos) : [];
    });

    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (text: string) => {
      if (!text.trim()) {
        toast.error('Please enter a task!', { position: 'top-right' });
        return;
      }
      const newTodo: Todo = { id: Date.now(), text, completed: false };
      setTodos((prevTodos) => [...prevTodos, newTodo]); 
      toast.success('Task added successfully!', { position: 'top-right' });
    };

    const toggleComplete = (id: number) => {
      setTodos((prevTodos) =>
        prevTodos.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
      toast.success('Task status updated!', { position: 'top-right' });
    };

    const deleteTodo = (id: number) => {
      setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
      toast.error('Task deleted!', { position: 'top-right' });
    };

    const updateTodo = (id: number, newText: string) => {
      if (!newText.trim()) {
        toast.error('Task cannot be empty!', { position: 'top-right' });
        return;
      }
      setTodos((prevTodos) =>
        prevTodos.map(todo =>
          todo.id === id ? { ...todo, text: newText } : todo
        )
      );
      toast.success('Task updated successfully!', { position: 'top-right', style: { background: '#f1c40f', color: '#333' } });
  };

  return (
    <div className="container mt-5">
      <Toaster position="top-right" reverseOrder={false} toastOptions={{ duration: 2000 }} />
      <div className="d-flex align-items-center justify-content-center mb-4">
        <img
          src={todoIcon}
          alt="To Do Icon"
          className="me-2 todo-icon"
          style={{ height: '80px', }} 
        />
        <h1 className="text-center m-0">To-Do List</h1>
      </div>
    
      <Card className="p-3 shadow-lg">
        <TodoForm addTodo={addTodo} />
        <TodoList todos={todos} 
                  toggleComplete={toggleComplete}
                  deleteTodo={deleteTodo} 
                  updateTodo={updateTodo} 
        />
      </Card>
    </div>
  );
};

export default App;
