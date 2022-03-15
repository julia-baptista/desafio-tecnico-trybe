import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TaskContext from './TaskContext';

const TaskProvider = ({children}) => {
  const [tasks, setTasks] = useState([]);
  const [sortedTasks, setSortedTasks] = useState(tasks);

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
      
      setTasks(taskList);
      console.log('useEffect')
    };
    fetchTaskList();
  }, []);


  useEffect(() => {
    setSortedTasks(tasks);
  }, [tasks]);

  // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value 
 


  // const sortByStatus = () => {
  //   const sortedByName = tasks.sort((a,b) => (a.status.toLowerCase() > b.status.toLowerCase()) ? 1 : ((a.name < b.name) ? -1 : 0));
  //   setSortedTasks(sortedByName);
  //   console.log(sortedTask);
  // }
  // sortByName();

  const contextData = {
    tasks,
    setTasks,
    sortedTasks,
    setSortedTasks
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