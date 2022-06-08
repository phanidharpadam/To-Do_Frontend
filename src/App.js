import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Reports from "./components/Charts/Reports";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import MenuAppBar from "./components/MenuAppBar";
import Snackbar from "./components/Snackbar";
import TodoForm from "./components/Todo/TodoForm";
import ListTodos from "./components/Todo/ListTodos";
import NotFound from "./components/NotFound";
import { useSelector } from "react-redux";
import { ProtectedRoute, ProtectedRoute2 } from "./components/ProtectedRoutes";
import MyProfile from "./components/User/MyProfile";

function App() {
  const auth = useSelector((state) => state.auth);
  const [menubarTitle, setMenubarTitle] = useState("");
  return (
    <Router>
      <Snackbar />
      {auth.token ? <MenuAppBar menubarTitle={menubarTitle} /> : null}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute2>
              <Home />
            </ProtectedRoute2>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard setMenubarTitle={setMenubarTitle} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addtodo"
          element={
            <ProtectedRoute>
              <TodoForm newForm setMenubarTitle={setMenubarTitle} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edittodo/:id"
          element={
            <ProtectedRoute>
              <TodoForm editForm setMenubarTitle={setMenubarTitle} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/viewtodo/:id"
          element={
            <ProtectedRoute>
              <TodoForm viewForm setMenubarTitle={setMenubarTitle} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/listtodos"
          element={
            <ProtectedRoute>
              <ListTodos setMenubarTitle={setMenubarTitle} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/charts"
          element={
            <ProtectedRoute>
              <Reports setMenubarTitle={setMenubarTitle} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <MyProfile setMenubarTitle={setMenubarTitle} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
