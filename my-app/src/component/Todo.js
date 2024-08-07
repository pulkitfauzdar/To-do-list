import React, { useState } from 'react';

const Todo = () => {
  const [todo, setTodo] = useState('');
  const [todoItems, setTodoItems] = useState([]);
  const [inProgressItems, setInProgressItems] = useState([]);
  const [completedItems, setCompletedItems] = useState([]);

  const handleInputChange = (e) => {
    setTodo(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (todo.trim()) {
      setTodoItems([...todoItems, todo]);
      setTodo('');
    }
  };

  const moveToInProgress = (index) => {
    const item = todoItems[index];
    setTodoItems((prev) => prev.filter((_, i) => i !== index));
    setInProgressItems((prev) => [...prev, item]);
  };

  const moveToCompleted = (index) => {
    const item = inProgressItems[index];
    setInProgressItems((prev) => prev.filter((_, i) => i !== index));
    setCompletedItems((prev) => [...prev, item]);
  };

  const deleteItem = (index) => {
    setCompletedItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Add Item"
          value={todo}
          onChange={handleInputChange}
        />
        <button type="submit">Enter</button>
      </form>
      <table border={1}>
        <thead>
          <tr>
            <th>To-Do</th>
            <th>In Progress</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <ul>
                {todoItems.map((item, index) => (
                  <li key={index}>
                    {item}
                    <button className="move" onClick={() => moveToInProgress(index)}>Move</button>
                  </li>
                ))}
              </ul>
            </td>
            <td>
              <ul>
                {inProgressItems.map((item, index) => (
                  <li key={index}>
                    {item}
                    <button className="move" onClick={() => moveToCompleted(index)}>Move</button>
                  </li>
                ))}
              </ul>
            </td>
            <td>
              <ul>
                {completedItems.map((item, index) => (
                  <li key={index}>
                    {item}
                    <button className="delete" onClick={() => deleteItem(index)}>Delete</button>
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Todo;
