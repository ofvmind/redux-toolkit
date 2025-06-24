"use client";

import { fetchTodoById } from "@/store/todosSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SelectedTodo({ id }) {
  const dispatch = useDispatch();
  const { selectedTodo, loading, error } = useSelector((state) => state.todos);
  useEffect(() => {
    dispatch(fetchTodoById(id));
  }, [dispatch, id]);

  if (loading) return null;
  if (!selectedTodo) return null;

  return (
    <div>
      <h1>{selectedTodo.title}</h1>
    </div>
  );
}
