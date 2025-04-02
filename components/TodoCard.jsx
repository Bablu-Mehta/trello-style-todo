import { useDrag } from "react-dnd";

const TodoCard = ({ todo, editTodo, deleteTodo }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TODO",
    item: { id: todo.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`p-4 mb-2 bg-white shadow rounded-lg ${isDragging ? "opacity-50" : "opacity-100"}`}
    >
      <h3 className="font-bold">{todo.title}</h3>
      <p className="text-sm text-gray-600">{todo.description}</p>
      <div className="flex justify-end space-x-2 mt-2">
        <button onClick={() => editTodo(todo)} className="px-2 py-1 bg-yellow-500 text-white rounded">Edit</button>
        <button onClick={() => deleteTodo(todo.id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
      </div>
    </div>
  );
};

export default TodoCard;
