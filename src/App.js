import React, { useState, useEffect } from 'react'


function App() {
  const savedTodos = localStorage.getItem("todos");

  const [todos, setTodos] = useState(savedTodos ? JSON.parse(savedTodos) : []);
  const [todo, setTodo] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState(todos[0].text);

  useEffect(() => {
    const temp = JSON.stringify(todos)
    localStorage.setItem("todos", temp)
  }, [todos])

  function handleSubmit(e) {
    e.preventDefault()

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false
    }
    // add our newTodo to our todos
    setTodos([...todos, newTodo])
    // set the input to blank 
    setTodo("")
  }

  function deleteTodo(id) {
    const updatedTodos = [...todos].filter((todo) => todo.id !== id)

    setTodos(updatedTodos)
  }

  function toggleComplete(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    })

    setTodos(updatedTodos)
  }

  function editTodo(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText
      }
      return todo
    })
    setTodos(updatedTodos)
    setTodoEditing(null)
    setEditingText(todo.text)
  }

  return (
    <div className='todo-app'>
      <h1>Taskier ✏️</h1>
      <div className='todo-container'>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button className='button add-task' type="submit">add task</button>
        </form>
        {todos.map((todo) => <div className='todo-item' key={todo.id}>
          <input
            type="checkbox"
            onChange={() => toggleComplete(todo.id)}
            checked={todo.completed}
          />

          {todoEditing === todo.id ? (<input
            type="text"
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
          />)
            :
            (<div className='todo-item-text'>{todo.text}</div>)}


          <button className='button button-deleteTodo' onClick={() => deleteTodo(todo.id)}>x</button>

          {todoEditing === todo.id ?
            (<button className='button button-submitEdits' onClick={() => editTodo(todo.id)}>Submit</button>)
            :
            (<button className='button button-editTodo' onClick={() => setTodoEditing(todo.id)}>Edit</button>)}

        </div>)}
      </div>
    </div>
  )
}

export default App
