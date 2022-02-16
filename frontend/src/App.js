import React from 'react';
import TaskProvider from './context/TaskProvider';
// import './App.css';
import Form from './components/Form';
import Table from './components/Table';

function App() {
  return (
    <TaskProvider>
      <>
      <Form />
      <Table />
      </>
    </TaskProvider>
  );
}

export default App;
