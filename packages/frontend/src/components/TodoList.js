import React from 'react';
import TodoCard from './TodoCard';

/**
 * Determines if a todo is overdue.
 * A todo is overdue if it has a due date strictly before today
 * and is not completed.
 */
function isOverdue(todo) {
  if (!todo.dueDate || todo.completed === 1 || todo.completed === true) {
    return false;
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueDate = new Date(todo.dueDate + 'T00:00:00');
  return dueDate < today;
}

function TodoList({ todos, onToggle, onEdit, onDelete, isLoading }) {
  if (todos.length === 0) {
    return (
      <div className="todo-list empty-state">
        <p className="empty-state-message">
          No todos yet. Add one to get started! 👻
        </p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
          isLoading={isLoading}
          isOverdue={isOverdue(todo)}
        />
      ))}
    </div>
  );
}

export default TodoList;
