import React from 'react';
import { Trash2 } from 'lucide-react';

function DeleteButton({ onDelete }) {
  return (
    <button onClick={onDelete} className="ocheck">
      <Trash2 size={20} />
    </button>
  );
}

export default DeleteButton;
