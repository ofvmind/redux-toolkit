import { getTotalPages } from "@/app/components/todos/utils/getTotalPages";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos", async (paramsObject, thunkApi) => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/todos", {
        params: {
          _limit: paramsObject.limit,
          _page: paramsObject.page
        }
      });

      const totalCount = Number(res.headers["x-total-count"]);
      const totalPages = getTotalPages(totalCount, 10);
      console.log(totalPages)

      return {data: res.data, totalPages};
    } catch (err) {
      return thunkApi.rejectWithValue("fetchTodos error");
    }
  }
);

export const fetchTodoById = createAsyncThunk(
  "todos/fetchTodoById", async (id, thunkApi) => {
    try {
      const res = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
      return res.data;
    } catch (err) {

    }
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    allTodos: [],
    totalPages: null,
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
      state.todos = state.allTodos = state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    },
    deleteTodo: (state, action) => {
      const id = action.payload;

      state.todos = state.allTodos = state.todos.filter(todo => todo.id !== id);
    },
    createTodo: (state, action) => {
      const todoText = action.payload;

      state.todos = state.allTodos = state.allTodos.concat({
        title: todoText,
        id: Date.now(),
        completed: false
      });
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchTodos.pending, state => {
      state.loading = true;
      state.error = null;
    }).addCase(fetchTodos.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = state.allTodos = action.payload.data;
      state.totalPages = action.payload.totalPages;
    }).addCase(fetchTodos.rejected, (state, action) => {
      state.loading = false;
      state.error = "fetchTodos error(ACTION)";
    })

    .addCase(fetchTodoById.pending, state => {
      state.loading = true;
      state.error = null;
    }).addCase(fetchTodoById.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = state.allTodos = action.payload;
    }).addCase(fetchTodoById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "fetchTodoById error(ACTION)";
    })
  }
});

export const { setTodos, searchTodo, completeTodo, deleteTodo, createTodo } = todosSlice.actions;
export default todosSlice.reducer;