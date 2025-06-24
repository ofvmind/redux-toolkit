"use client";
import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, searchTodo } from "@/store/todosSlice";
import { Loader } from "../UI/Loader";

export default function TodosList() {
  const dispatch = useDispatch();
  const { todos, allTodos, loading, error } = useSelector(state => state.todos);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  useEffect(() => {
    if (allTodos.length > 0) {
      dispatch(searchTodo(searchQuery));
    }
  }, [searchQuery, allTodos.length]);

  return (
    <div className="center_column">
      <input style={{color: "black", fontSize: 20}} type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}/>
      {error && <p style={{color: "red", fontSize: 32}}>{error}</p>}
      {loading 
        ? <Loader />
        : todos.map((todo, index) => 
            <TodoItem key={todo.id} todo={todo} index={index}/>
        )
      }
    </div>
  );
}