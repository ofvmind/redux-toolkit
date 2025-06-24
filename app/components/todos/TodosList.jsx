"use client";
import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, searchTodo } from "@/store/todosSlice";

export default function TodosList() {
  const dispatch = useDispatch();
  const { todos: visibleTodos, allTodos, loading, error } = useSelector(state => state.todos);
  const [searchQuery, setSearchQuery] = useState("");

  // Загружаем данные один раз
  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  // Выполняем фильтрацию только если allTodos уже есть
  useEffect(() => {
    if (allTodos.length > 0) {
      dispatch(searchTodo(searchQuery));
    }
  }, [searchQuery, allTodos.length]);

  return (
    <div className="center_column todos">
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ width: "100%", color: "#000" }}
        placeholder="Поиск..."
      />

      {loading && <p>Загрузка...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {visibleTodos.map((todo, index) => (
        <TodoItem key={todo.id} todo={todo} index={index} />
      ))}
    </div>
  );
}
