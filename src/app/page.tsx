'use client'

import { useState } from 'react'
import TodoList from '@/components/TodoList'
import TodoForm from '@/components/TodoForm'

export interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])

  const addTodo = (text: string) => {
    if (text.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: text.trim(),
        completed: false
      }
      setTodos([...todos, newTodo])
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const editTodo = (id: number, newText: string) => {
    if (newText.trim() !== '') {
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, text: newText.trim() } : todo
      ))
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Todo List
        </h1>
        <TodoForm onAddTodo={addTodo} />
        <TodoList
          todos={todos}
          onToggleTodo={toggleTodo}
          onDeleteTodo={deleteTodo}
          onEditTodo={editTodo}
        />
        {todos.length === 0 && (
          <p className="text-gray-500 text-center mt-6">
            No todos yet. Add one above!
          </p>
        )}
      </div>
    </main>
  )
}