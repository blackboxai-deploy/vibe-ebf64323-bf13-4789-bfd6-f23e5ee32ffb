'use client'

import { useState } from 'react'
import { Todo } from '@/app/page'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onEdit: (id: number, newText: string) => void
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editText.trim()) {
      onEdit(todo.id, editText)
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditText(todo.text)
    setIsEditing(false)
  }

  return (
    <div className={`flex items-center gap-3 p-3 border rounded-lg ${
      todo.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300'
    }`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
      />
      
      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex-1 flex gap-2">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <button
            type="submit"
            className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <span
            className={`flex-1 ${
              todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
            }`}
          >
            {todo.text}
          </span>
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
            disabled={todo.completed}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
          >
            Delete
          </button>
        </>
      )}
    </div>
  )
}