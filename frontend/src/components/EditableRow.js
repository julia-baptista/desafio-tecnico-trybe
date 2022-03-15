import React from 'react';

const EditableRow = ({task, index, handleChangeEditedTask, editedTask, handleSave}) => {
  return(
    
      <tr>
        <td>{index + 1}</td>
        <td>
          <input
            type="text"
            name="name"
            id="name"
            value={editedTask.name}
            onChange={e => handleChangeEditedTask(e)}
          />
        </td>
        <td>
          <select
            name="status"
            id="status"
            onChange={e => handleChangeEditedTask(e)}
            defaultValue={editedTask.status}
          >
            <option value="pendente">pendente</option>
            <option value="em andamento">em andamento</option>
            <option value="pronto">pronto</option>
          </select>
        </td>
        <td>{task.createdAt}</td>
        <td>
          <button data-id={task._id}>
            DELETAR
          </button>
          <button data-id={task._id} >
            EDITAR
          </button>
          <button data-id={task._id} onClick={(e) => handleSave(e, task._id)}>
            SALVAR
          </button>
        </td>
      </tr>
  );
}

export default EditableRow;