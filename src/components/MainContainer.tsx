import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { Todo } from '../models/Todo';
import toast from 'react-hot-toast';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import todoIcon from '../assets/todo.gif';

const MainContainer: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>(() => {
        const storedTodos = localStorage.getItem('todos');
        return storedTodos ? JSON.parse(storedTodos) : [];
    });

    const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all');

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (text: string) => {
        if (!text.trim()) {
            toast.error('Please enter a task!');
            return;
        }
        const newTodo: Todo = {
            id: Date.now(),
            text,
            completed: false,
            createdAt: new Date().toLocaleDateString()
        };
        setTodos((prevTodos) => [...prevTodos, newTodo]);
        toast.success('Task added successfully!');
    };

    const toggleComplete = (id: number) => {
        setTodos((prevTodos) =>
            prevTodos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
        toast.success('Task status updated!');
    };

    const deleteTodo = (id: number) => {
        setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
        toast.error('Task deleted!');
    };

    const updateTodo = (id: number, newText: string) => {
        if (!newText.trim()) {
            toast.error('Task cannot be empty!');
            return;
        }
        setTodos((prevTodos) =>
            prevTodos.map(todo =>
                todo.id === id ? { ...todo, text: newText } : todo
            )
        );
        toast.success('Task updated successfully!');
    };

    const filteredTodos = todos.filter(todo =>
        filter === 'all' ? true : filter === 'completed' ? todo.completed : !todo.completed
    );

    return (
        <div>
            <div className="d-flex align-items-center justify-content-center mb-4">
                <img
                    src={todoIcon}
                    alt="To Do Icon"
                    className="me-2 todo-icon"
                    style={{ height: '80px' }}
                />
                <h1 className="text-center m-0">To-Do List</h1>
            </div>

            <Card className="p-3 shadow-lg">
                <div className="d-flex gap-2 mb-3">
                    <TodoForm addTodo={addTodo} />
                    <Dropdown>
                        <Dropdown.Toggle variant="primary">Filter</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item className="text-primary" onClick={() => setFilter('all')}>All</Dropdown.Item>
                            <Dropdown.Item className="text-success" onClick={() => setFilter('completed')}>Completed</Dropdown.Item>
                            <Dropdown.Item className="text-danger" onClick={() => setFilter('incomplete')}>Incomplete</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <TodoList
                    todos={filteredTodos}
                    toggleComplete={toggleComplete}
                    deleteTodo={deleteTodo}
                    updateTodo={updateTodo}
                />
            </Card>
        </div>
    );
};

export default MainContainer;
