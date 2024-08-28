import React, { useEffect, useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { EditTodoForm } from "./EditTodoForm";
import Swal from 'sweetalert2';
import axios from 'axios';

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  // Fetch todos from the backend when the component mounts
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:5001/home');
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  // Function to add a new todo
  const addTodo = async (task) => {
    try {
      const response = await axios.post('http://localhost:5001/home', { task });
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
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
        await axios.delete(`http://localhost:5001/home/${id}`);
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
  const toggleComplete = async (id) => {
    try {
      const todo = todos.find((todo) => todo.id === id);
  
      if (!todo) {
        console.error(`Todo with id ${id} not found`);
        return;
      }
  
      const updatedTodo = { ...todo, completed: !todo.completed };
      await axios.put(`http://localhost:5001/home/${id}`, updatedTodo);
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
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
  const editTask = async (task, id) => {
    try {
      const existingTodo = todos.find((todo) => todo.id === id);
      if (!existingTodo) {
        console.error('Todo not found');
        return;
      }
  
      const updatedTodo = { ...existingTodo, task };
      const response = await axios.put(`http://localhost:5001/home/${id}`, updatedTodo);
      setTodos(
        todos.map((todo) =>
          todo.id === id ? response.data : todo
        )
      );
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm key={todo._id} editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo._id}
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

export default TodoWrapper;
