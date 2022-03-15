import React, { useState, useContext } from 'react';
import TaskContext from '../context/TaskContext';
import "bootstrap/dist/css/bootstrap.min.css"

const Form = () => {
  const { tasks, setSortedTasks, sortedTasks, setTasks } = useContext(TaskContext);

  const [newTask, setNewTask] = useState({
    name: '',
    status: 'pendente',
  });

  const handleChange = ({ target: { value, name } }) => {
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  const onSubmit = async (event) => {
    event.preventDefault();
    let result;
    try {
      result = await fetch('http://localhost:4000/task', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json', 
        },
        body: JSON.stringify(newTask),
      })
    } catch(err) {
      console.log(err)
    }

    const newTaskData = await result.json();
    setTasks((prev) => ([
      ...prev, newTaskData
    ]));
    
    setNewTask({
      ...newTask,
      name: '',
    })
  };

  const sortByName = () => {
    const sortedByName = tasks.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((a.name < b.name) ? -1 : 0));
    console.log(sortedByName);
    setSortedTasks(sortedByName);
    console.log(sortedTasks);
    // window.location.reload();
  }

    return(
      <div>
        <div className="container">
          <div className="form-div">
            <form onSubmit={onSubmit}>
              <input
                type= 'text'
                name= 'name'
                value={newTask.name}
                placeholder= 'Tarefa'
                onChange={handleChange}
                className='form-control form-group'
              />
              <select
                name="status"
                onChange={ handleChange }
              >
                <option value="pendente">pendente</option>
                <option value="em andamento">em andamento</option>
                <option value="pronto">pronto</option>
              </select>      
              <input type='submit' className='btn btn-danger btn-block' value='Submit'/>
            </form>
            <button onClick={() => sortByName() }>Ordenar pelo Nome</button>
          </div>
        </div>
      </div>
    );

}

export default Form;
