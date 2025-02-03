import axios from "axios";
import React, { useEffect, useState } from "react";

function MainPage() {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos?_limit=5"
      );
      const titles = response.data.map((todo) => todo.title);
      titles.forEach((title) => localStorage.setItem(title, title));
      setTodoList(titles);
    };

    if (localStorage.length === 0) {
      fetchTodos();


    } else {
      setTodoList(Object.keys(localStorage));
    }
  }, []);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodoList([...todoList, newTodo]);
      localStorage.setItem(newTodo, newTodo);
      setNewTodo("");
    }
  };

  const removeTodo = (title) => {
    localStorage.removeItem(title);
    setTodoList(todoList.filter((todo) => todo !== title));
  };

  const clearTodos = () => {
    localStorage.clear();
    setTodoList([]);
  };

  return(
    <div className="add-input">
      <div className='new-todo'>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}

          placeholder="New Todo"
          size="40" 
        />
        <button onClick={addTodo} className="plus-btn">+</button>
      </div>
        {todoList.map((todo) => (
          <div key={todo} className='todo-list'>  
            <span className='check'>✔</span>
            <span>
              {todo} <a onClick={() => removeTodo(todo)} className="delete-btn">🗑️</a>
            </span>
          </div>
        ))}
      <button onClick={clearTodos} class="clear-btn">Clear All</button>
    </div>
  )
}

export default MainPage;