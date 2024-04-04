import React, { useState } from 'react';


function TaskNote({ tasks, removeItem, searchQuery, setTasks }) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [editedTask, setEditedTask] = useState('');

  // Filter the tasks based on the search query
  const filteredTasks = tasks.filter(task =>
    task.toDoItem.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Split tasks into pending and completed tasks
  const pendingTasks = filteredTasks.filter(task => task.status === 'Pending');
  const completedTasks = filteredTasks.filter(task => task.status === 'Completed');

  // Function to toggle Pending Tasks to Completed Tasks
  const completeTask = (taskId) => {
    setTimeout(() => {
      setTasks(tasks.map(task => {
        if (task.id === taskId) {
          return { ...task, status: task.status === 'Pending' ? 'Completed' : 'Pending' };
        }
        return task;
      }));
    }, 1000);
  };

  // Function to handle modal open
  const openModal = (task) => {
    setSelectedTask(task);
    setEditedTask(task.toDoItem); // Initialize editedTask with the content of the selected task
  };

  // Function to handle modal close
  const closeModal = () => {
    setSelectedTask(null);
    setEditedTask(''); // Clear editedTask when modal is closed
  };

  // Function to handle editing and saving task
  const saveEditedTask = () => {
    if (editedTask.trim() !== '') {
      setTasks(tasks.map(task => {
        const taskId = new Date().toLocaleString() + Math.floor(Math.random() * 100000);
        if (task.id === selectedTask.id) {
          return { ...task, toDoItem: editedTask, id: taskId };
        }
        return task;
      }));
      closeModal();
    }
  };

  // Function to toggle task importancie
  const toggleImportant = (taskId) => {
    setTimeout(() => {
      setTasks(tasks.map(task => {
        if (task.id === taskId) {
          return { ...task, important: !task.important };
        }
        return task;
      }));
    }, 1500);
  };

  // JSX for the checkbox badge
  const importantBadge = (taskId, important) => (
    <span className={`position-absolute translate-middle badge text-${important ? 'dark' : 'light'} bg-${!important ? 'secondary' : 'warning'}`} style={{ top: "20px", left: '83.5%', width: "110px" }} onClick={() => toggleImportant(taskId)}>
      {important ? '! Important' : '- Not Important'}
    </span>
  );


  return (
    <>
      <div className="container my-5">
        <div className="d-inline">
          {tasks.length > 0 ? (
            <>

              {/* Pending tasks  */}
              <div className="col mb-5" >
                <div className="row">
                  <h3 className='text-decoration-underline'>{pendingTasks.length > 0 ? "Pending Tasks" : ""}</h3>
                  <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 mt-2">
                    {pendingTasks.sort((a, b) => (b.important ? 1 : 0) - (a.important ? 1 : 0)).map((task, index) => (
                      <div key={task.id || index} className="col-md-4">
                        <div className="card bg-light" style={{ height: "100%" }}>
                          {importantBadge(task.id, task.important)}
                          <div className="form-check mx-3 mt-3 mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              onChange={() => completeTask(task.id)}
                              checked={task.status === 'Completed'}
                              id={`checkbox-${task.id}`}
                            />
                            <label className="form-check-label fw-bold" htmlFor={`checkbox-${task.id}`}>
                              {task.status}{task.status === 'Completed' ? '👍' : '⏰'}
                            </label>
                          </div>
                          <div className="card-body" onClick={() => openModal(task)}>
                            <p className={`card-text ${task.status === "Completed" ? 'text-decoration-line-through' : ''}`} style={{ textAlign: 'justify' }}>
                              {task.toDoItem.length > 250 ? task.toDoItem.substring(0, 250) + '...' : task.toDoItem}</p>
                          </div>
                          <div className="d-inline p-2 ms-auto">
                            <button
                              className="btn btn-outline-danger "
                              onClick={() => removeItem(index)}
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div >

              <hr />

              {/* Completed tasks  */}
              <div className="col mt-5">
                <div className="row">
                  <h3 className='text-decoration-underline'>{completedTasks.length > 0 ? "Completed Tasks" : ""}</h3>
                  <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 mt-2">
                    {completedTasks.sort((a, b) => (b.important ? 1 : 0) - (a.important ? 1 : 0)).map((task, index) => (
                      <div key={task.id || index} className="col-md-4">
                        <div className="card bg-light" style={{ height: "100%" }}>
                          {importantBadge(task.id, task.important)}
                          <div className="form-check mx-3 mt-3 mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              onChange={() => completeTask(task.id)}
                              checked={task.status === 'Completed'}
                              id={`checkbox-${task.id}`}
                            />
                            <label className="form-check-label fw-bold" htmlFor={`checkbox-${task.id}`}>
                              {task.status}{task.status === 'Completed' ? '👍' : '⏰'}
                            </label>
                          </div>
                          <div className="card-body" onClick={() => openModal(task)}>
                            <p className={`card-text  ${task.status === "Completed" ? 'text-decoration-line-through' : ''}`} style={{ textAlign: 'justify' }}
                            >{task.toDoItem.length > 250 ? task.toDoItem.substring(0, 250) + '...' : task.toDoItem}
                            </p>
                          </div>
                          <div className="d-inline p-2 m-2">
                            <button
                              className="btn btn-danger"
                              onClick={() => removeItem(index)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              { // Pop up modal for all tasks
                selectedTask && (
                  <div className="modal modal-lg" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content bg-secondary-subtle">
                        <div className="modal-header">
                          <h5 className="modal-title">Edited on {selectedTask.id.slice(0, -5)}</h5>
                          <button type="button" className="btn-close" onClick={closeModal}></button>
                        </div>
                        <div className="modal-body p-0">
                          <textarea
                            style={{ height: "500px !important", textAlign: "justify" }}
                            className="form-control bg-secondary-subtle"
                            value={editedTask}
                            onChange={(e) => setEditedTask(e.target.value)}
                            rows="18" cols="30"
                          ></textarea>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-danger" onClick={closeModal}>Close</button>
                          <button type="button" className="btn btn-success" onClick={saveEditedTask}>Save</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
            </>
          ) : (
            // Empty Task Display message
            <div>
              <h3 className='fst-italic fw-bold text-center'>Create a Tasks to Track Ur Journey</h3>
            </div>
          )}

        </div >
      </div >
    </>
  );
}

export default TaskNote;
