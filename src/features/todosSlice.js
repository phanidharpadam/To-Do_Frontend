import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "./api";

const initialState = {
  todos: [],
  reportData: [],
  addTodoStatus: "",
  addTodoError: "",
  getTodoStatus: "",
  getTodoError: "",
  updateTodoStatus: "",
  updateTodoError: "",
  deleteTodoStatus: "",
  deleteTodoError: "",
  getTodosReportStatus: "",
  getTodosReportError: "",
};

export const createTodo = createAsyncThunk(
  "todos/createTodo",
  async (todo, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const bodyParameters = {
        data: {
          title: todo.title,
          description: todo.description,
          priority: todo.priority,
          status: "New",
          dueDate: todo.dueDate,
          creator: todo.creator,
        },
      };
      let response = await axios.post(`${url}/todos`, bodyParameters, config);
      return response?.data?.data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response);
    }
  }
);

export const getTodos = createAsyncThunk(
  "todos/getTodos",
  async (id = null, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      let response = await axios.get(`${url}/todos`, config);

      const { data } = response.data;
      const newResponse = data.map((todo) => {
        todo.attributes.id = todo.id;
        return todo.attributes;
      });

      return newResponse;
    } catch (error) {
      console.log(error);
      rejectWithValue(error.response);
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (data, { rejectWithValue }) => {
    const { todo, _id } = data;
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const bodyParameters = {
        data: {
          title: todo.title,
          description: todo.description,
          priority: todo.priority,
          status: todo.status.status,
          dueDate: todo.dueDate,
        },
      };

      let response = await axios.put(
        `${url}/todos/${_id}`,
        bodyParameters,
        config
      );

      return response?.data?.data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      let response = await axios.delete(`${url}/todos/${id}`, config);

      const { data } = response.data;
      return data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error.response);
    }
  }
);

export const getTodosReport = createAsyncThunk(
  "todos/getTodosReport",
  async (id = null, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      let response = await axios.get(`${url}/todos-report`, config);

      const { data } = response;

      return data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error.response);
    }
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    clearStatus: (state, action) => {
      return {
        ...state,
        addTodoStatus: "",
        addTodoError: "",
        getTodoStatus: "",
        getTodoError: "",
        updateTodoStatus: "",
        updateTodoError: "",
        deleteTodoStatus: "",
        deleteTodoError: "",
        getTodosReportStatus: "",
        getTodosReportError: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createTodo.pending, (state, action) => {
      return {
        ...state,
        addTodoStatus: "pending",
        addTodoError: "",
        getTodoStatus: "",
        getTodoError: "",
        updateTodoStatus: "",
        updateTodoError: "",
        deleteTodoStatus: "",
        deleteTodoError: "",
        getTodosReportStatus: "",
        getTodosReportError: "",
      };
    });
    builder.addCase(createTodo.fulfilled, (state, action) => {
      if (action.payload) {
        const { attributes, id } = action.payload;
        attributes.id = id;

        return {
          ...state,
          todos: [attributes, ...state.todos],
          addTodoStatus: "success",
          addTodoError: "",
          getTodoStatus: "",
          getTodoError: "",
          updateTodoStatus: "",
          updateTodoError: "",
          deleteTodoStatus: "",
          deleteTodoError: "",
          getTodosReportStatus: "",
          getTodosReportError: "",
        };
      } else return state;
    });
    builder.addCase(createTodo.rejected, (state, action) => {
      const { status, statusText } = action.payload;
      return {
        ...state,
        addTodoStatus: "rejected",
        addTodoError: `${status} - ${statusText}`,
        getTodoStatus: "",
        getTodoError: "",
        updateTodoStatus: "",
        updateTodoError: "",
        deleteTodoStatus: "",
        deleteTodoError: "",
        getTodosReportStatus: "",
        getTodosReportError: "",
      };
    });
    builder.addCase(getTodos.pending, (state, action) => {
      return {
        ...state,
        addTodoStatus: "",
        addTodoError: "",
        getTodoStatus: "pending",
        getTodoError: "",
        updateTodoStatus: "",
        updateTodoError: "",
        deleteTodoStatus: "",
        deleteTodoError: "",
        getTodosReportStatus: "",
        getTodosReportError: "",
      };
    });
    builder.addCase(getTodos.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          todos: action.payload,
          addTodoStatus: "",
          addTodoError: "",
          getTodoStatus: "success",
          getTodoError: "",
          updateTodoStatus: "",
          updateTodoError: "",
          deleteTodoStatus: "",
          deleteTodoError: "",
          getTodosReportStatus: "",
          getTodosReportError: "",
        };
      } else return state;
    });
    builder.addCase(getTodos.rejected, (state, action) => {
      const { status, statusText } = action.payload;
      return {
        ...state,
        addTodoStatus: "",
        addTodoError: "",
        getTodoStatus: "rejected",
        getTodoError: `${status} - ${statusText}`,
        updateTodoStatus: "",
        updateTodoError: "",
        deleteTodoStatus: "",
        deleteTodoError: "",
        getTodosReportStatus: "",
        getTodosReportError: "",
      };
    });
    builder.addCase(updateTodo.pending, (state, action) => {
      return {
        ...state,
        addTodoStatus: "",
        addTodoError: "",
        getTodoStatus: "",
        getTodoError: "",
        updateTodoStatus: "pending",
        updateTodoError: "",
        deleteTodoStatus: "",
        deleteTodoError: "",
        getTodosReportStatus: "",
        getTodosReportError: "",
      };
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      if (action.payload) {
        const { attributes, id } = action.payload;
        attributes.id = id;
        const updatedTodos = state.todos.map((todo) =>
          todo.id === id ? attributes : todo
        );
        return {
          ...state,
          todos: updatedTodos,
          addTodoStatus: "",
          addTodoError: "",
          getTodoStatus: "",
          getTodoError: "",
          updateTodoStatus: "success",
          updateTodoError: "",
          deleteTodoStatus: "",
          deleteTodoError: "",
          getTodosReportStatus: "",
          getTodosReportError: "",
        };
      } else return state;
    });
    builder.addCase(updateTodo.rejected, (state, action) => {
      const { status, statusText } = action.payload;
      return {
        ...state,
        addTodoStatus: "",
        addTodoError: "",
        getTodoStatus: "",
        getTodoError: "",
        updateTodoStatus: "rejected",
        updateTodoError: `${status} - ${statusText}`,
        deleteTodoStatus: "",
        deleteTodoError: "",
        getTodosReportStatus: "",
        getTodosReportError: "",
      };
    });
    builder.addCase(deleteTodo.pending, (state, action) => {
      return {
        ...state,
        addTodoStatus: "",
        addTodoError: "",
        getTodoStatus: "",
        getTodoError: "",
        updateTodoStatus: "",
        updateTodoError: "",
        deleteTodoStatus: "pending",
        deleteTodoError: "",
        getTodosReportStatus: "",
        getTodosReportError: "",
      };
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      if (action.payload) {
        const { id } = action.payload;
        const currentTodos = state.todos.filter((todo) => todo.id !== id);
        return {
          ...state,
          todos: currentTodos,
          addTodoStatus: "",
          addTodoError: "",
          getTodoStatus: "",
          getTodoError: "",
          updateTodoStatus: "",
          updateTodoError: "",
          deleteTodoStatus: "success",
          deleteTodoError: "",
          getTodosReportStatus: "",
          getTodosReportError: "",
        };
      } else return state;
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      const { status, statusText } = action.payload;
      return {
        ...state,
        addTodoStatus: "",
        addTodoError: "",
        getTodoStatus: "",
        getTodoError: "",
        updateTodoStatus: "",
        updateTodoError: "",
        deleteTodoStatus: "rejected",
        deleteTodoError: `${status} - ${statusText}`,
        getTodosReportStatus: "",
        getTodosReportError: "",
      };
    });
    builder.addCase(getTodosReport.pending, (state, action) => {
      return {
        ...state,
        addTodoStatus: "",
        addTodoError: "",
        getTodoStatus: "",
        getTodoError: "",
        updateTodoStatus: "",
        updateTodoError: "",
        deleteTodoStatus: "",
        deleteTodoError: "",
        getTodosReportStatus: "pending",
        getTodosReportError: "",
      };
    });
    builder.addCase(getTodosReport.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          reportData: action.payload,
          addTodoStatus: "",
          addTodoError: "",
          getTodoStatus: "",
          getTodoError: "",
          updateTodoStatus: "",
          updateTodoError: "",
          deleteTodoStatus: "",
          deleteTodoError: "",
          getTodosReportStatus: "success",
          getTodosReportError: "",
        };
      } else return state;
    });
    builder.addCase(getTodosReport.rejected, (state, action) => {
      const { status, statusText } = action.payload;
      return {
        ...state,
        addTodoStatus: "",
        addTodoError: "",
        getTodoStatus: "",
        getTodoError: "",
        updateTodoStatus: "",
        updateTodoError: "",
        deleteTodoStatus: "",
        deleteTodoError: "",
        getTodosReportStatus: "rejected",
        getTodosReportError: `${status} - ${statusText}`,
      };
    });
  },
});

export const { clearStatus } = todosSlice.actions;

export default todosSlice.reducer;
