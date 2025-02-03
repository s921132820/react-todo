import axios from "axios";
import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";

function MainPage() {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [todoDate, setTodoDate] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos?_limit=5"
      );

      // 받아온 데이터를 객체로 변환하여 localStorage에 저장
      const todos = response.data.map((todo) => {
        const todoItem = {
          id: todo.id, // 고유 id 추가
          title: todo.title,
          date: new Date().toISOString().split("T")[0], // 현재 날짜 추가
          completed: todo.completed,
        };
        localStorage.setItem(todoItem.id, JSON.stringify(todoItem)); // id를 키로 사용
        return todoItem;
      });

      setTodoList(todos);
    };

    if (localStorage.length === 0) {
      fetchTodos();
    } else {
      // localStorage에서 데이터 불러오기
      const storedTodos = Object.keys(localStorage).map((key) =>
        JSON.parse(localStorage.getItem(key))
      );
      setTodoList(storedTodos);
    }
  }, []);

  const addTodo = () => {
    if (newTodo.trim() !== "" && todoDate.trim() !== "") {
      const newTodoItem = { 
        id: new Date().getTime(), // id는 시간 기반으로 생성
        title: newTodo, 
        date: todoDate, 
        completed: false // 새로 추가된 항목은 기본적으로 완료되지 않음
      };

      setTodoList([...todoList, newTodoItem]);
      localStorage.setItem(newTodoItem.id, JSON.stringify(newTodoItem));

      setNewTodo("");
      setTodoDate("");
    }
  };

  const removeTodo = (id) => {
    localStorage.removeItem(id);
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  const clearTodos = () => {
    localStorage.clear();
    setTodoList([]);
  };

  const toggleComplete = (id) => {
    const isConfirmed = window.confirm("상태를 변경하시겠습니까?");

    if(isConfirmed) {
      const updatedTodos = todoList.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
          localStorage.setItem(todo.id, JSON.stringify(todo));
        }
        return todo;
      });
      setTodoList(updatedTodos);
    }
  };

  return (
    <div className="add-input">
      <Calendar todoList={todoList} />

      <div className="new-todo">
        <input
          type="date"
          value={todoDate}
          onChange={(e) => setTodoDate(e.target.value)}
        />
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
        <div key={todo.id} className="todo-list">
          <div>
            {
              todo.completed ? (
                <span className="label label-true" onClick={() => toggleComplete(todo.id)}>complete</span> // 완료 표시
              ) : (
                <span className="label label-false" onClick={() => toggleComplete(todo.id)}>Incomplete</span> // 미완료 표시
              )
            }
            <p>{todo.date}</p>
            <p>{todo.title}</p>
          </div>
          <a onClick={() => removeTodo(todo.id)} className="delete-btn">🗑️</a>
        </div>
      ))}

      <button onClick={clearTodos} className="clear-btn">Clear All</button>
    </div>
  );
}

export default MainPage;
