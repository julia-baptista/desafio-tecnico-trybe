import React from 'react';

const ReadOnlyRow = ({task, index, handleDelete, setEditContactId, handleEditClick }) => {
  return(
    <tr>
      <td>{ index + 1}</td>
      <td>{task.name}</td>
      <td>{task.status}</td>
      <td>{task.createdAt}</td>
      <td>
        <button data-id={task._id} onClick={ (e) => handleDelete(e, task._id) }>
          DELETAR 
        </button>
        {/* <button data-id={task._id} onClick={() => setEditContactId(task._id)} > */}
        <button data-id={task._id} onClick={ () => handleEditClick(task) } >
          EDITAR
        </button>
        <button data-id={task._id}>
          SALVAR
        </button>
      </td>
    </tr>
  )
}

export default ReadOnlyRow;