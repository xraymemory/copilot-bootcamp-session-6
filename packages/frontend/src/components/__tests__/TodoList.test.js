import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoList from '../TodoList';

describe('TodoList Component', () => {
  const mockHandlers = {
    onToggle: jest.fn(),
    onEdit: jest.fn(),
    onDelete: jest.fn()
  };

  const mockTodos = [
    {
      id: 1,
      title: 'Todo 1',
      dueDate: '2025-12-25',
      completed: 0,
      createdAt: '2025-11-01T00:00:00Z'
    },
    {
      id: 2,
      title: 'Todo 2',
      dueDate: null,
      completed: 1,
      createdAt: '2025-11-02T00:00:00Z'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render empty state when todos array is empty', () => {
    render(<TodoList todos={[]} {...mockHandlers} isLoading={false} />);
    
    expect(screen.getByText(/No todos yet. Add one to get started!/)).toBeInTheDocument();
  });

  it('should render all todos when provided', () => {
    render(<TodoList todos={mockTodos} {...mockHandlers} isLoading={false} />);
    
    expect(screen.getByText('Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Todo 2')).toBeInTheDocument();
  });

  it('should render correct number of todo cards', () => {
    const { container } = render(
      <TodoList todos={mockTodos} {...mockHandlers} isLoading={false} />
    );
    
    const cards = container.querySelectorAll('.todo-card');
    expect(cards).toHaveLength(2);
  });

  it('should pass handlers to TodoCard components', () => {
    render(<TodoList todos={mockTodos} {...mockHandlers} isLoading={false} />);
    
    // Verify that edit buttons exist for each todo
    expect(screen.getAllByLabelText(/Edit/)).toHaveLength(2);
    expect(screen.getAllByLabelText(/Delete/)).toHaveLength(2);
  });

  it('should mark overdue todos with overdue class', () => {
    // Create a todo with a past due date (overdue) and one with future date
    const pastDate = '2020-01-01';
    const futureDate = '2099-12-31';
    const todosWithDates = [
      { id: 1, title: 'Overdue Todo', dueDate: pastDate, completed: 0, createdAt: '2025-11-01T00:00:00Z' },
      { id: 2, title: 'Future Todo', dueDate: futureDate, completed: 0, createdAt: '2025-11-02T00:00:00Z' }
    ];
    
    const { container } = render(
      <TodoList todos={todosWithDates} {...mockHandlers} isLoading={false} />
    );
    
    const cards = container.querySelectorAll('.todo-card');
    expect(cards[0]).toHaveClass('overdue');
    expect(cards[1]).not.toHaveClass('overdue');
  });

  it('should not mark completed todos as overdue even with past due date', () => {
    const todosCompleted = [
      { id: 1, title: 'Completed Overdue', dueDate: '2020-01-01', completed: 1, createdAt: '2025-11-01T00:00:00Z' }
    ];
    
    const { container } = render(
      <TodoList todos={todosCompleted} {...mockHandlers} isLoading={false} />
    );
    
    const card = container.querySelector('.todo-card');
    expect(card).not.toHaveClass('overdue');
  });
});
