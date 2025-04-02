const statuses = ["Pending", "In Progress", "Completed"];

const Modal = ({ newTodo, setNewTodo, closeModal, addOrUpdateTodo, editingTodo }) => (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg w-1/3">
        <h2 className="text-lg font-bold mb-4">{editingTodo ? "Edit Todo" : "Add New Todo"}</h2>
        <input type="text" value={newTodo.title} onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })} placeholder="Enter title" className="p-2 border rounded w-full mb-2" />
        <textarea value={newTodo.description} onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })} placeholder="Enter description" className="p-2 border rounded w-full mb-2" />
        <select value={newTodo.status} onChange={(e) => setNewTodo({ ...newTodo, status: e.target.value })} className="p-2 border rounded w-full mb-2">
          {statuses.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        <div className="flex justify-end space-x-2">
          <button onClick={closeModal} className="p-2 bg-gray-500 text-white rounded">Cancel</button>
          <button onClick={addOrUpdateTodo} className="p-2 bg-blue-500 text-white rounded">{editingTodo ? "Update" : "Add"}</button>
        </div>
      </div>
    </div>
  );

  export default Modal;