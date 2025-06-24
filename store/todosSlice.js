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
      });
      return res.data;
    } catch (err) {
      return thunkApi.rejectWithValue("Fetch error todos");
    }
  }
);

export const fetchTodoById = createAsyncThunk(
  "todos/fetchTodoById", async (id, thunkApi) => {
    try {
      const res = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
      return res.data;
    } catch (err) {
      return thunkApi.rejectWithValue("Fetch error todo by id");
    }
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    allTodos: [],
    todos: [],
    selectedTodo: null,
    loading: false,
    error: null
  },
  reducers: {
    setTodos: (state, action) => {
      state.allTodos = action.payload;
      state.todos = action.payload;
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      console.log(action.payload)
    },
    completeTodo: (state, action) => {
      state.todos = state.todos.map(todo => {
        if (todo.id == action.payload) 
          todo.completed = !todo.completed;
        return todo;
      });
    },
    searchTodo: (state, action) => {
      const query = action.payload.trim();
      const regex = new RegExp(query, "gi");

      if (!query) {
        state.todos = state.allTodos;
      } else {
        state.todos = state.allTodos.filter(todo => todo.title.match(regex));
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchTodos.pending, state => {
      state.loading = true;
      state.error = null;
    }).addCase(fetchTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
      state.allTodos = action.payload;
      state.loading = false;
    }).addCase(fetchTodos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Fetch todos error (ACTION)";
    })

    .addCase(fetchTodoById.pending, state => {
      state.loading = true;
      state.error = null;
    }).addCase(fetchTodoById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedTodo = action.payload;
    }).addCase(fetchTodoById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Error fetch todo by id (ACTON)";
    })
  }
});

export default todosSlice.reducer;
export const { setTodos, deleteTodo, completeTodo, searchTodo } = todosSlice.actions;