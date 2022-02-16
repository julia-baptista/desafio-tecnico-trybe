import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TaskContext from './TaskContext';

const TaskProvider = ({children}) => {
  const [tasks, setTasks] = useState([]);


   // ComponentDidMount
   // https://stackoverflow.com/questions/67855897/why-do-i-get-error-neterr-connection-refused-with-json-server-post-request
   useEffect(() => {
    const fetchTaskList = async () => {
      // const taskListAxios = await axios.get('http://localhost:4000/task');
      const taskListFetch = await fetch('http://localhost:4000/task', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      });
      const taskListObj = await taskListFetch.json();
      const taskList = taskListObj.taskList;
      // console.log(taskList);
      setTasks(taskList);
    };
    fetchTaskList();
  }, []);

  const contextData = {
    tasks,
  }

  return (
    <TaskContext.Provider value={ contextData }>
      { children }
    </TaskContext.Provider>
  );
}

TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TaskProvider;