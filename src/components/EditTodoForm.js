import React, { useState } from 'react';

// Define the EditTodoForm component, which handles editing an existing todo
export const EditTodoForm = ({ editTodo, task }) => {
  // State to manage the value of the input field, initialized with the current task's text
  const [value, setValue] = useState(task.task);

  // State to manage error messages
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the input value is blank or only whitespace
    if (value.trim() === '') {
      // Set an error message if the task is blank
      setError('Task cannot be blank');
      return;
    }

    // Call the editTodo function to update the task
    editTodo(value, task.id);

    // Clear the error message after successful submission
    setError('');
  };

  return (
    // Form element to handle updating the task
    <form onSubmit={handleSubmit} className="TodoForm">
      {/* Input field to edit the task */}
      <input 
        type="text" 
        value={value} 
        onChange={(e) => setValue(e.target.value)} 
        className="todo-input" 
        placeholder='Update task' 
      />
      {/* Display error message if there's an error */}
      {error && <p className="error">{error}</p>}
      {/* Button to submit the form and update the task */}
      <button type="submit" className='todo-btn'>Update Task</button>
    </form>
  );
};
