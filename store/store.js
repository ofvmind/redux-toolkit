import { configureStore } from "@reduxjs/toolkit";
import todosSlise from "./todosSlice";

export const store = configureStore({
  reducer: {
    todos: todosSlise
  }
});