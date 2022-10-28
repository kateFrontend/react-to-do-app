import { FaEdit, FaTrash } from "react-icons/fa";

function ToDo({ items, removeItem, editItem }) {
  // structure props from App.js in a function parameters
  return (
    <div className="todo-task">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article key={id} className="todo-item">
            <p className="title">{title}</p>
            <div className="btn-container">
              <button
                type="button"
                className="edit-btn"
                onClick={() => editItem(id)}
              >
                <FaEdit className="icons"/>
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => removeItem(id)}
              >
                <FaTrash className="icons" />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default ToDo;
