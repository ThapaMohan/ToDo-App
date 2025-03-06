import { useState, useEffect } from "react"
import { TodoProvider } from "./contexts"
import TodoForm from "./components/TodoForm"
import TodoItem from "./components/TodoItem"
function App() {

  //todos means values which in array
  const [todos, setTodos] = useState([])

  //todo mean object
  const addTodo = (todo) => {
    //add the data to array
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  const deleteTodo = (id) => {
    //delete the todo item if the id doesnot true
    //filter works with true value
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const updateTodo = (id, todo) => {
    //use map for loop and find the id to update the todo item
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? todo : prevTodo))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id ===
      //{...prevTodo} mean take all object from the array -- we change the value of {complete} object in array--
      id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo))
  }

  useEffect(() => {
    //use to get item which is in string so we need to convert string into object i.e. JSON
    //todos is key 
    const todos = JSON.parse(localStorage.getItem("todos"))
    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    //use to get item which is in string so we need to convert string into object i.e. JSON
    //todos is key 
    localStorage.setItem("todos", JSON.stringify(todos))
  }
    , [todos])
  return (
    <TodoProvider value={{ todos, addTodo, deleteTodo, updateTodo, toggleComplete }}>
      <div className="bg-[#0b72a7] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id} className='w-full'>
                <TodoItem todo={todo} />
              </div>
            ))}

          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
