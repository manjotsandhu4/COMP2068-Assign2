import React, { useState } from 'react';
import Routes from './Routes';
import Nav from './shared/Nav';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  const [user, setUser] = useState(false);
  return (
    <React.Fragment >
      <ToastContainer/>
      <Nav user={user}/> 
      <Routes user={user} setUser={setUser}/>
    </React.Fragment>
  );
}

export default App;
