import { useState } from "react";

export default function App() {

  const [value, setValue] = useState("");
  let [todos, setTodos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setTodos((todos) => {
      return [...todos, { id: crypto.randomUUID(), title: value, completed: false },]
    })

    setValue("");
  }

  const toggleTodos = (id, completed) => {
    setTodos(currTodos => {
      return currTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed: completed }
        }
        return todo
      })
    })
  }

  const deleteTodo = (id) => {
    setTodos(currTodos => {
      return currTodos.filter(todo => todo.id !== id)
    })
  }

  return (
    <div className="flex justify-center mt-28 overflow-hidden">
      <div className="flex flex-col gap-7 border-black rounded-xl border-4 xl:w-[30vw] lg:w-[40vw] md:w-[40vw] sm:w-[90vw] h-[max-content] p-3 overflow-auto">
        <form className="border-black border-2 w-full p-2 flex items-center justify-between rounded-lg text-lg" onSubmit={handleSubmit}>
          <input className="w-full p-1 outline-none" type="text" title="Item" placeholder="Add an item" required
            onChange={(e) => { setValue(e.target.value) }} value={value} />
          <button type="submit" title="Add Item">
            <i className="fa-solid fa-plus hover:text-white hover:bg-black transition-colors duration-400 p-1.5 rounded-full cursor-pointer icon"></i>
          </button>
        </form>
        <ul className="flex flex-col gap-2 overflow-auto">
          {
            todos.length === 0
              ? <div className="text-center">No new Items</div>
              :
              todos.map(todo => (
                <li key={todo.id} className="flex items-center justify-between p-2 border-2 border-black rounded-md max-w-[80vw]">
                  <div className="flex gap-2 overflow-hidden w-full">
                    <input type="checkbox" className="w-5 cursor-pointer" checked={todo.completed} onChange={(e) => toggleTodos(todo.id, e.target.checked)} id={todo.id} />
                    <label htmlFor={todo.id} className={`flex gap-2 w-full text-xl text-wrap overflow-auto scrollbar-hidden cursor-pointer ${todo.completed ? "line-through" : ""}`}>
                      {todo.title}
                    </label>
                  </div>
                  <i className="icon fa-solid fa-trash p-2 cursor-pointer hover:text-white hover:bg-black rounded-full transition-colors duration-300"
                    onClick={() => deleteTodo(todo.id)}
                  >
                  </i>
                </li>
              ))
          }
        </ul>
      </div>
    </div >
  )
}
