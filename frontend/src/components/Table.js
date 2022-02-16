import React, { useContext, useState } from 'react';
import ReactDOM from 'react-dom';
// import ReactDOMServer from 'react-dom/server';
import TableRow from './TableRow';

// import React, { useContext } from 'react';
import TaskContext from '../context/TaskContext';
import "bootstrap/dist/css/bootstrap.min.css"

const Table = () => {
  const { tasks } = useContext(TaskContext);
  // const [taskList, setTaskList] = useState([]);
  // const [newTask, setNewTask] = useState({
  //   name: '',
  //   status: '',
  // });

  const [nameTask, setNameTask] = useState('');

  const [statusTask, setStatusTask] = useState('');
  
  // useEffect(() => {
  //   setTaskList(tasks);
  // }, [tasks]);

  // console.log(tasks);
  // console.log(taskList);

  // const handleChange = ({ target: { value, name } }) => {
  //   setNewTask({
  //     ...newTask,
  //     [name]: value,
  //   });
  // };

  // const handleChangeName = ({ target: { value} }) => {
  //   setNewTask({
  //     ...newTask,
  //     name: value,
  //   });
  // };

  // const handleChangeStatus = ({ target: { value} }) => {
  //   setNewTask({
  //     ...newTask,
  //     status: value,
  //   });
  // };

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

  // https://stackoverflow.com/questions/44315547/ternary-in-jsx-to-add-selected-attribute-to-option
  // const createForm = (_id, name, status, createdAt, index ) => (
  //     <>
  //       <td>{index + 1}</td>
  //       <td><input type="text" name="name" value={name} onChange={handleChange}/></td>
  //       <td>
  //         <select
  //           name="status"
  //           onChange={handleChange}
  //         >
  //           <option value="pendente" selected = {status === "pendente" ? true : false}>pendente</option>
  //           <option value="em andamento" selected = {status === "em andamento" ? true : false} >em andamento</option>
  //           <option value="pronto" selected = {status === "pronto" ? true : false}>pronto</option>
  //         </select>
  //       </td>
  //       <td>{createdAt}</td>
  //       <td>
  //         <button data-id={_id} onClick={handleDelete}>
  //           DELETAR
  //         </button>
  //         <button data-id={_id} >
  //           EDITAR
  //         </button>
  //         <button data-id={_id}>
  //           SALVAR
  //         </button>
  //       </td>
  //     </>
  //   );

  // https://reactjs.org/docs/react-dom-server.html#rendertostaticmarkup
  // https://www.geeksforgeeks.org/how-to-pass-a-parameter-to-an-event-handler-or-callback/
  const handleEdit = (_id, name, status, createdAt, index, {target}) => {
    setNameTask({
      name,
    });
    setStatusTask({
      status,
    });
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
      />,
    tableRow);
    console.log(tableRow);
  };

  if (!tasks) return <p>Loading ...</p>
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
            tasks.map(( {_id, name, status, createdAt }, index) => (
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