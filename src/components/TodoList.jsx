import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTodoContext } from '../context/TodoContext';
import TodoItem from './TodoItem';

function TodoList() {
  const location = useLocation();
  const { todos, addTodo, clearCompleted } = useTodoContext();
  
  const [newTodo, setNewTodo] = React.useState('');
  
  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);
  
  const filteredTodos = location.pathname === '/completed' 
    ? completedTodos 
    : location.pathname === '/pending' 
    ? activeTodos 
    : todos;

  const handleSubmit = (e) => {
    if (e.key === 'Enter' && newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  return (
    <div className="todo-list-container">
      <div className="todo-list-content">
        <h1 className="todo-list-title">My Day</h1>
        <p className="todo-list-subtitle">All my tasks in one place</p>

        {/* Input siempre visible */}
        <input
          type="text"
          className="todo-input"
          placeholder="Type new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={handleSubmit}
          autoFocus
        />

        {/* Solo mostrar el contenedor si hay tareas */}
        {todos.length > 0 && (
          <div className="todo-input-container">
            <div className="todo-items">
              {filteredTodos.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </div>
            
            <div className="todo-footer">
              <span>
                {activeTodos.length}{activeTodos.length === 1 ? ' item' : ' items'} left
              </span>
              
              <div className="todo-filters">
                <Link 
                  to="/all"
                  className={`todo-filter-button ${location.pathname === '/all' ? 'active' : ''}`}
                >
                  All
                </Link>
                <Link 
                  to="/pending"
                  className={`todo-filter-button ${location.pathname === '/pending' ? 'active' : ''}`}
                >
                  Pending
                </Link>
                <Link 
                  to="/completed"
                  className={`todo-filter-button ${location.pathname === '/completed' ? 'active' : ''}`}
                >
                  Completed
                </Link>
                
                {completedTodos.length > 0 && (
                  <button
                    onClick={clearCompleted}
                    className="todo-clear-completed"
                  >
                    Clear completed
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoList;
