"use client";

import { completeTodo, deleteTodo } from "@/store/todosSlice";
import Link from "next/link";
import { useDispatch } from "react-redux";

export default function TodoItem({ todo, index }) {
  const dispatch = useDispatch();

  const cl = [];
  todo.completed && cl.push("done", "done2");

  return (
    <div className={`${cl[1]} space_between todo`}>
      <div style={{display: "flex", alignItems: "center", gap: 25}}>
      <input onChange={() => dispatch(completeTodo(todo.id))} type="checkbox" checked={todo.completed} />
        <p>{index + 1}.</p>
        <Link className={cl[0]} href={`todos/${todo.id}`}>{todo.title}</Link>
      </div>
      <p className="delTodo" onClick={() => dispatch(deleteTodo(todo.id))}>
        &nbsp;
      </p>
    </div>
  );
}
