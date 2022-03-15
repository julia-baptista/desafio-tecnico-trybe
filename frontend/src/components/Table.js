import React, { useContext, useState, useEffect, Fragment } from 'react';
// import ReactDOM from 'react-dom';
// import TableRow from './TableRow';
import TaskContext from '../context/TaskContext';
import EditableRow from './EditableRow';
import ReadOnlyRow from './ReadOnlyRow';
import "bootstrap/dist/css/bootstrap.min.css"

const Table = () => {
  const { sortedTasks, tasks, setTasks } = useContext(TaskContext);
  // const [updatedTasks, setUpdatedTask] = useState(sortedTasks);

  const [editContactId, setEditContactId] = useState(null);
  const [editedTask, setEditedTask] = useState({
    name: '',
    status: '',
  });

  const handleChangeEditedTask = ({ target: { value, name } }) => {
    setEditedTask({
      ...editedTask,
      [name]: value,
    });
  };

  // useEffect(() => {
  //   let test = [...sortedTasks]
  //   setUpdatedTask(test);
  // }, [sortedTasks]);


  const handleDelete = async (e, id) => {
    // console.log(target.getAttribute('data-id'));
    // const id = target.getAttribute('data-id');
    e.preventDefault();
    try {
      await fetch(`http://localhost:4000/task/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json', 
        },
      })
    } catch(err) {
      console.log(err)
    }

    setTasks(prev => ([
      ...prev.filter(task => task._id !== id)
    ]))

  };

  const handleEditClick = (task) => {
    setEditedTask({
      name: task.name,
      status: task.status,
    });
    setEditContactId(task._id)
  }

  const handleSave = async (e, id) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:4000/task/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json', 
        },
        body: JSON.stringify(editedTask),
      })
    } catch(err) {
      console.log(err)
    }
    console.log('---------------------- save', await tasks);
    setTasks((prev) => (
      // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
      //...prev.splice(prev.findIndex((task) => task._id === id), 1, newTask)
      prev.map((task) => {
        if (task._id === id) {
          task.name = editedTask.name;
          task.status = editedTask.status;
        }
        return task;
      })
    ));

    setEditContactId(null);
  }; 

  if (!tasks) return <p>Loading ...</p>
  return(
    <div className="container">
      <form>
      <table>
        <thead>
          <tr>
            <th>Tarefa</th>
            <th>Nome</th>
            <th>Status</th>
            <th>Data de Criação</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {
              tasks.map(( task, index) => (
                <Fragment key={index}>
                  {editContactId === task._id ? (
                  <EditableRow
                    task={task}
                    index={index}
                    handleChangeEditedTask={handleChangeEditedTask}
                    editedTask={editedTask}
                    handleSave={ handleSave }
                  />
                  ): (
                  <ReadOnlyRow
                  task={task}
                  index={index}
                  handleDelete={ handleDelete }
                  handleEditClick={ handleEditClick }
                  />
                  ) }
                </Fragment>
              ))
          }
        </tbody>
      </table>
      </form>
    </div>
  );
}

export default Table;
