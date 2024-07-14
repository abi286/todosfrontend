import React, { useEffect, useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";
import Swal from 'sweetalert2'

// Define the TodoWrapper component, which manages the state and logic for the todo list
export const TodoWrapper = () => {
  // State to manage the list of todos
  const [todos, setTodos] = useState([]);

  // Fetch todos from the backend when the component mounts
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('http://localhost:5001/todos');
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  // Function to add a new todo
  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  };

  // Function to delete a todo by id
  const deleteTodo = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!'
      });
  
      if (result.isConfirmed) {
        await fetch(`http://localhost:5001/todos${id}`, { method: 'DELETE' });
        setTodos(todos.filter((todo) => todo.id !== id));
        Swal.fire(
          'Deleted!',
          'Your todo has been deleted.',
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your todo is safe :)',
          'error'
        );
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
      Swal.fire(
        'Error!',
        'There was a problem deleting your todo.',
        'error'
      );
    }
  };

  // Function to toggle the completion status of a todo by id
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Function to toggle the editing status of a todo by id
  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  // Function to update the task of a todo by id
  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      {/* Form to add a new todo */}
      <TodoForm addTodo={addTodo} />
      {/* Display the list of todos */}
      {todos.map((todo) =>
        todo.isEditing ? (
          // Render EditTodoForm if the todo is in editing mode
          <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
        ) : (
          // Render Todo if the todo is not in editing mode
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};
