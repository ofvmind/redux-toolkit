"use client";
import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, searchTodo } from "@/store/todosSlice";
import { Loader } from "../UI/Loader";
import { AddTodo } from "./AddTodo";
import { getPagesArray } from "./utils/getPagesArray";

export default function TodosList() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const { todos, allTodos, totalPages, loading, error } = useSelector(
    (state) => state.todos
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchTodos({
      limit,
      page
    }));
  }, [page]);

  useEffect(() => {
    if (allTodos.length > 0) {
      dispatch(searchTodo(searchQuery));
    }
  }, [searchQuery, allTodos.length]);

  const pagesArray = getPagesArray(totalPages);

  return (
    <div className="center_column">
      {error && <p style={{ color: "red", fontSize: 32 }}>{error}</p>}
      {loading ? (
        <Loader />
      ) : (
        <>
          <input
            className="todoFilter"
            style={{ color: "black", fontSize: 20 }}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <AddTodo />
          <div className="todos center_column">
            {todos.map((todo, index) => (
              <TodoItem key={todo.id} todo={todo} index={index} />
            ))}
          </div>
          <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: 5}}>
            {pagesArray.map(p => 
              <button
                style={{
                  border: "2px solid red",
                  background: "red",
                  color: "#fff",
                  fontSize: 25
                }}
                key={p}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
