import { useDrop } from "react-dnd";
import TodoCard from './TodoCard';
const Lane = ({ status, todos, moveTodo, editTodo, deleteTodo }) => {
    const [{ isOver }, drop] = useDrop({
      accept: "TODO",
      drop: (item) => moveTodo(item.id, status),
      collect: (monitor) => ({ isOver: !!monitor.isOver() }),
    });
  
    return (
      <div ref={drop} className={`w-1/3 p-4 rounded-lg shadow-lg border border-gray-300 min-h-[400px] ${isOver ? "bg-blue-100" : "bg-gray-100"}`}>
        <h2 className="text-lg font-bold mb-4 text-center">{status}</h2>
        {todos.filter((todo) => todo.status === status).map((todo) => (
          <TodoCard key={todo.id} todo={todo} editTodo={editTodo} deleteTodo={deleteTodo} />
        ))}
      </div>
    );
  };

  export default Lane;