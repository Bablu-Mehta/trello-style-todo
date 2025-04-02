"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Loader from "./Loader";

const Lane = lazy(() => import("./Lane"));
const Modal = lazy(() => import("./Modal"));

const API_URL = "https://dummyjson.com/todos";
const statuses = ["Pending", "In Progress", "Completed"];

const Kanban = () => {
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    status: "Pending",
  });
  const [editingTodo, setEditingTodo] = useState(null);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}?limit=10`);
      return response.data.todos.map((todo) => ({
        id: todo.id,
        title: todo.todo,
        description: "No description provided",
        status: todo.completed ? "Completed" : "Pending",
      }));
    } catch (error) {
      console.error("Error fetching todos:", error);
      return [];
    }
  };

  useEffect(() => {
    const loadTodos = async () => {
      const todos = await fetchTodos();
      setTodos(todos);
    };
  
    loadTodos();
  }, []);

  const moveTodo = (id, newStatus) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, status: newStatus } : todo
      )
    );
  };

  const addOrUpdateTodo = () => {
    if (!newTodo.title.trim()) return;

    setTodos((prev) =>
      editingTodo
        ? prev.map((todo) =>
            todo.id === editingTodo.id
              ? { ...newTodo, id: editingTodo.id }
              : todo
          )
        : [...prev, { ...newTodo, id: prev.length + 1 }]
    );

    setNewTodo({ title: "", description: "", status: "Pending" });
    setIsModalOpen(false);
    setEditingTodo(null);
  };

  const deleteTodo = (id) =>
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  const editTodo = (todo) => {
    setNewTodo(todo);
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="mb-4 p-2 bg-green-500 text-white rounded"
        >
          Add Todo
        </button>
        <div className="flex space-x-4">
          {statuses.map((status) => (
            <Suspense fallback={<Loader />} key={status}>
              <Lane
                status={status}
                todos={todos}
                moveTodo={moveTodo}
                editTodo={editTodo}
                deleteTodo={deleteTodo}
              />
            </Suspense>
          ))}
        </div>
        {isModalOpen && (
          <Suspense fallback={<Loader />}>
            <Modal
              newTodo={newTodo}
              setNewTodo={setNewTodo}
              closeModal={() => setIsModalOpen(false)}
              addOrUpdateTodo={addOrUpdateTodo}
              editingTodo={editingTodo}
            />
          </Suspense>
        )}
      </div>
    </DndProvider>
  );
};

export default Kanban;
