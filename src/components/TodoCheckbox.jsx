import React from 'react';

function TodoCheckbox({ checked, onChange }) {
  return (
    <div className={`custom-checkbox ${checked ? 'checked' : ''}`} onClick={onChange}>
      {checked && <span className="checkmark">✓</span>}
    </div>
  );
}






export default TodoCheckbox;
