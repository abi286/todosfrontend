import React, { useState } from 'react';

// Define the TodoForm component, which handles adding a new todo
export const TodoForm = ({ addTodo }) => {
  // State to manage the value of the input field
  const [value, setValue] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the input value is not empty
    if (value) { 
      // Add the new todo
      addTodo(value);
      // Reset the input field
      setValue('');
    }
  };

  return (
    // Form element to handle adding new tasks
    <form onSubmit={handleSubmit} className="TodoForm">
      {/* Input field to type the new task */}
      <input 
        type="text" 
        value={value} 
        onChange={(e) => setValue(e.target.value)} 
        className="todo-input" 
        placeholder='What is the task today?' 
      />
      {/* Button to submit the form and add the task */}
      <button type="submit" className='todo-btn'>Add Task</button>
    </form>
  );
};
