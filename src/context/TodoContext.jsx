import React, { createContext, useContext, useEffect, useState } from 'react';

const TodoContext = createContext(undefined);

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('mydayapp-reactjs');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem('mydayapp-reactjs', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title) => {
    setTodos(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title,
        completed: false
      }
    ]);
  };

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const updateTodo = (id, title) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, title } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  return (
    <TodoContext.Provider value={{
      todos,
      addTodo,
      toggleTodo,
      updateTodo,
      deleteTodo,
      clearCompleted
    }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodoContext() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
}
