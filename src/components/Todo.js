import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

// Define the Todo component, which displays an individual todo item
export const Todo = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  return (
    <div className="Todo">
      {/* 
        Display the task's text.
        Apply a class based on whether the task is completed or not.
        The onClick handler toggles the task's completion state.
      */}
      <p className={`${task.completed ? "completed" : "incompleted"}`} 
        onClick={() => toggleComplete(task.id)}>{task.task}</p>
      <div>
        {/* 
          Edit icon.
          The onClick handler triggers the editTodo function with the task's id to switch to edit mode.
        */}
        <FontAwesomeIcon 
          className="edit-icon" 
          icon={faPenToSquare} 
          onClick={() => editTodo(task.id)} 
        />
        {/* 
          Delete icon.
          The onClick handler triggers the deleteTodo function with the task's id to remove the task.
        */}
        <FontAwesomeIcon 
          className="delete-icon" 
          icon={faTrash} 
          onClick={() => deleteTodo(task.id)} 
        />
      </div>
    </div>
  );
};
