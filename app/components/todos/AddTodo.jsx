"use client";

import { createTodo } from "@/store/todosSlice";
import { useDispatch } from "react-redux";

const { useState } = require("react");

const useInputValue = (defaultValue = "") => {
  const [value, setValue] = useState(defaultValue);

  return {
    bind: {
      value,
      onChange: e => setValue(e.target.value)
    },
    value: () => value,
    clear: () => setValue("")
  }
};

export const AddTodo = () => {
  const dispatch = useDispatch();
  const inputX = useInputValue("");

  function submitHandler(e) {
      e.preventDefault();
      
      if (inputX.value().trim()) {
        dispatch(createTodo(inputX.value()));
        
        inputX.clear();
    }
  }

  return (
    <form style={{display: "flex", justifyContent: "center", alignItems: "center"}} onSubmit={submitHandler} action="#">
      <input className="todoFilter" placeholder="Add new todo" {...inputX.bind} type="text" />
      <button style={{color: "#000"}} type="submit">Add todo</button>
    </form>
  );
};