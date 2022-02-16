import React, { useState } from 'react';
// import TaskContext from '../context/TaskContext';
import "bootstrap/dist/css/bootstrap.min.css"

const Form = () => {
  // const { tasks } = useContext(TaskContext);

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
    await fetch('http://localhost:4000/task', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json', 
      },
      body: JSON.stringify(newTask),
    })

    // windo.location = '/'

    setNewTask({
      ...newTask,
      name: '',
    })
    window.location.reload();
  };

    return(
      <div>
        <div className="container">
          <div className="form-div">
            <form onSubmit={onSubmit}>
              <input
                type= 'text'
                name= 'name'
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
          </div>
        </div>
      </div>
    );

}

export default Form;
