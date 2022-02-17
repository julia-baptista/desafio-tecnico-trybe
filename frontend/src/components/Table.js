import React, { useContext, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import TableRow from './TableRow';
import TaskContext from '../context/TaskContext';
import "bootstrap/dist/css/bootstrap.min.css"

const Table = () => {
  const { sortedTasks } = useContext(TaskContext);
  const [updatedTasks, setUpdatedTasks] = useState(sortedTasks);

  const [nameTask, setNameTask] = useState('');
  const [statusTask, setStatusTask] = useState('');

  useEffect(() => {
    let test = [...sortedTasks]
    setUpdatedTasks(test);
  }, [sortedTasks]);

  // useEffect(() => {
  //   let test = [...sortedTasks]; // make a copy
  //   setUpdatedTask( test);
  // }, [ sortedTasks]);

  const handleDelete = async ({ target }) => {
    console.log(target.getAttribute('data-id'));
    const id = target.getAttribute('data-id');
    await fetch(`http://localhost:4000/task/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json', 
      },
    })
    window.location.reload();
  };

  // https://reactjs.org/docs/react-dom-server.html#rendertostaticmarkup
  // https://www.geeksforgeeks.org/how-to-pass-a-parameter-to-an-event-handler-or-callback/
  const handleEdit = (_id, name, status, createdAt, index, {target}) => {
    setNameTask(name);
    setStatusTask(status);
    const tableRow = target.parentNode.parentNode;
    // const form = ReactDOMServer.renderToString(createForm(_id, name, status, createdAt, index));
    tableRow.innerHTML = "";
    ReactDOM.render(
      <TableRow 
        _id={_id}
        name={name}
        status={status}
        createdAt={createdAt}
        index={index}
        setNameTask={setNameTask}
        setStatusTask={setStatusTask}
        nameTask={nameTask}
        statusTask={statusTask}
      />,
    tableRow);
    console.log(tableRow);
  };

;

  if (!updatedTasks) return <p>Loading ...</p>
  return(
    <div className="container">
      
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
            updatedTasks.map(( {_id, name, status, createdAt }, index) => (
              <tr key={_id} >
                <td>{ index + 1}</td>
                <td>{name}</td>
                <td>{status}</td>
                <td>{createdAt}</td>
                <td>
                  <button data-id={_id} onClick={handleDelete}>
                    DELETAR
                  </button>
                  <button data-id={_id} onClick={({target})=>handleEdit(_id, name, status, createdAt, index, {target})} >
                    EDITAR
                  </button>
                  <button data-id={_id}>
                    SALVAR
                  </button>
                </td>
            </tr>
          ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;