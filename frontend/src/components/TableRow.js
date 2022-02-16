import React from 'react';

const TableRow = ({ _id, name, status, createdAt, index, setNameTask, setStatusTask}) => {
  return(
      <>
        <td>{index + 1}</td>
        <td>
          <input type="text" name="name" placeholder={name} onChange={e => setNameTask(e.target.value)}/>
        </td>
        <td>
          <select
            name="status"
            onChange={e => setStatusTask(e.target.value)}
            defaultValue={status}
          >
            {/* <option value="pendente" selected = {status === "pendente" ? true : false}>pendente</option>
            <option value="em andamento" selected = {status === "em andamento" ? true : false} >em andamento</option>
            <option value="pronto" selected = {status === "pronto" ? true : false}>pronto</option> */}
            <option value="pendente">pendente</option>
            <option value="em andamento">em andamento</option>
            <option value="pronto">pronto</option>
          </select>
        </td>
        <td>{createdAt}</td>
        <td>
          <button data-id={_id}>
            DELETAR
          </button>
          <button data-id={_id} >
            EDITAR
          </button>
          <button data-id={_id}>
            SALVAR
          </button>
        </td>
      </>
  );
}

export default TableRow;