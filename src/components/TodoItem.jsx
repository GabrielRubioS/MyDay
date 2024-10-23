import React, { useState } from 'react';
import { useTodoContext } from '../context/TodoContext';
import TodoCheckbox from './TodoCheckbox';
import TodoTitle from './TodoTittle'; 
import DeleteButton from './DeleteButton';

function TodoItem({ todo }) {
  const { toggleTodo, updateTodo, deleteTodo } = useTodoContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.title);

  const handleEdit = () => {
    setIsEditing(true);
    setEditValue(todo.title);
  };

  const handleUpdate = (e) => {
    if (e.key === 'Enter') {
      const trimmedValue = editValue.trim();
      if (trimmedValue) {
        updateTodo(todo.id, trimmedValue);
      }
      setIsEditing(false);
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditValue(todo.title);
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className='todo-checkbox'>
        <TodoCheckbox
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
      </div>
      <div className="todo-text">
        <TodoTitle
          isEditing={isEditing}
          editValue={editValue}
          setEditValue={setEditValue}
          handleUpdate={handleUpdate}
          handleEdit={handleEdit}
          todo={todo}
        />
      </div>
      <div className="Basurita">
        <DeleteButton onDelete={() => deleteTodo(todo.id)} />
      </div>
    </div>
  );
}

export default TodoItem;
