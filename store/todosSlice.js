import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos", async (_, thunkApi) => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/todos", {
        params: {
          _limit: 10,
          _page: 1
        }
      })
      return res.data;
    } catch (err) {
      return thunkApi.rejectWithValue("fetchTodos error");
    }
  }
);

export const fetchTodoById = createAsyncThunk(
  "todos/fetchTodoById", async (id, thunkApi) => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/todos/" + id);
      return res.data;
    } catch (err) {
      return thunkApi.rejectWithValue("fetchTodoById error");
    }
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    allTodos: [],
    selectedTodo: null,
    loading: false,
    error: null
  },
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
      state.allTodos = action.payload;
    },
    searchTodo: (state, action) => {
      const query = action.payload.trim();
      const regex = new RegExp(query, "gi");

      if (!query) {
        state.todos = state.allTodos;
      } else {
        state.todos = state.allTodos.filter(todo => todo.title.match(regex));
      }
    },
    completeTodo: (state, action) => {
      const id = action.payload;
      
      state.todos = state.allTodos = state.allTodos.map(todo => {
        if (todo.id == id) 
          todo.completed = !todo.completed;

        return todo; 
      });
    },
    deleteTodo: (state, action) => {
      const id = action.payload;
      
      state.todos = state.allTodos = state.allTodos.filter(todo => todo.id !== id);
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchTodos.pending, state => {
      state.loading = true;
      state.error = null;
    }).addCase(fetchTodos.fulfilled, (state, action) => {
      state.loading = false;
      state.allTodos = state.todos = action.payload;
    }).addCase(fetchTodos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "fetchTodos error(ACTION)";
    })

    .addCase(fetchTodoById.pending, state => {
      state.loading = true;
      state.error = null;
    }).addCase(fetchTodoById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedTodo = action.payload;
    }).addCase(fetchTodoById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "fetchTodoById error(ACTION)";
    })
  }
});

export const { setTodos, searchTodo, completeTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;