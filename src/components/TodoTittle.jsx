import React, { useRef, useEffect } from 'react';

function TodoTitle({ isEditing, editValue, setEditValue, handleUpdate, handleEdit, todo }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return isEditing ? (
    <input
      ref={inputRef}
      type="text"
      value={editValue}
      onChange={(e) => setEditValue(e.target.value)}
      onKeyDown={handleUpdate}
      onBlur={() => setEditValue(todo.title)}
      className="InputBefore"
    />
  ) : (
    <span
      onDoubleClick={handleEdit}
      className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : ''}`}
    >
      {todo.title}
    </span>
  );
}

export default TodoTitle;
