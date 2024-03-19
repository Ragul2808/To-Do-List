import React, { useState, useEffect } from 'react';
import './App.css';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';


function App() {
  const [allTodos, setAllTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [completedTodos, setCompletedTodos] = useState([]);
  const [isCompletedScreen, setIsCompletedScreen] = useState(false);

  const handleAddNewToDo = () => {
    if (!newTodoTitle.trim()) {
      // Prevent adding empty todo
      return;
    }

    const newToDoObj = {
      title: newTodoTitle,
      description: newDescription,
    };

    const updatedTodoArr = [...allTodos, newToDoObj];
    setAllTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
    setNewDescription('');
    setNewTodoTitle('');
  };

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todolist')) || [];
    const savedCompletedToDos =
      JSON.parse(localStorage.getItem('completedTodos')) || [];

    setAllTodos(savedTodos);
    setCompletedTodos(savedCompletedToDos);
  }, []);

  const handleToDoDelete = index => {
    const reducedTodos = allTodos.filter((_, i) => i !== index);
    localStorage.setItem('todolist', JSON.stringify(reducedTodos));
    setAllTodos(reducedTodos);
  };

  const handleCompletedTodoDelete = index => {
    const reducedCompletedTodos = completedTodos.filter((_, i) => i !== index);
    localStorage.setItem('completedTodos', JSON.stringify(reducedCompletedTodos));
    setCompletedTodos(reducedCompletedTodos);
  };

  const handleComplete = index => {
    const date = new Date();
    const formattedDate = date.toLocaleString();

    const filteredTodo = {
      ...allTodos[index],
      completedOn: formattedDate,
    };

    const updatedCompletedList = [...completedTodos, filteredTodo];
    setCompletedTodos(updatedCompletedList);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedList));

    handleToDoDelete(index);
  };

  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title:</label>
            <input
              type="text"
              value={newTodoTitle}
              onChange={e => setNewTodoTitle(e.target.value)}
              placeholder="What's the title of your To Do?"
            />
          </div>
          <div className="todo-input-item">
            <label>Description:</label>
            <input
              type="text"
              value={newDescription}
              onChange={e => setNewDescription(e.target.value)}
              placeholder="What's the description of your To Do?"
            />
          </div>
          <div className="todo-input-item">
            <button
              className="primary-btn"
              type="button"
              onClick={handleAddNewToDo}
            >
              Add
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            className={`secondaryBtn ${!isCompletedScreen && 'active'}`}
            onClick={() => setIsCompletedScreen(false)}
          >
            To Do
          </button>
          <button
            className={`secondaryBtn ${isCompletedScreen && 'active'}`}
            onClick={() => setIsCompletedScreen(true)}
          >
            Completed
          </button>
        </div>
        <div className="todo-list">
          {isCompletedScreen === false &&
            allTodos.map((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div>
                  <AiOutlineDelete
                    title="Delete?"
                    className="icon"
                    onClick={() => handleToDoDelete(index)}
                  />
                  <BsCheckLg
                    title="Completed?"
                    className=" check-icon"
                    onClick={() => handleComplete(index)}
                  />
                </div>
              </div>
            ))}

          {isCompletedScreen === true &&
            completedTodos.map((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p>
                    <i>Completed at: {item.completedOn}</i>
                  </p>
                </div>
                <div>
                  <AiOutlineDelete
                    className="icon"
                    onClick={() => handleCompletedTodoDelete(index)}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
