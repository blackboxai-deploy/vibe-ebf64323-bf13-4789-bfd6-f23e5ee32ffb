import { Todo } from '@/app/page'
import TodoItem from './TodoItem'

interface TodoListProps {
  todos: Todo[]
  onToggleTodo: (id: number) => void
  onDeleteTodo: (id: number) => void
  onEditTodo: (id: number, newText: string) => void
}

export default function TodoList({ todos, onToggleTodo, onDeleteTodo, onEditTodo }: TodoListProps) {
  return (
    <div className="space-y-2">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggleTodo}
          onDelete={onDeleteTodo}
          onEdit={onEditTodo}
        />
      ))}
    </div>
  )
}