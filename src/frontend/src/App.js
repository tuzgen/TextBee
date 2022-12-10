import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { io } from "socket.io-client"
import { useState } from 'react';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';


const socket = io("http://localhost:3001")




function App() {

  const [token, setToken] = useState();

  if(!token) {
    return <LoginPage setToken={setToken} />
  }

  socket.on("connect", () => {
    console.log("Connected!")
  })
  return (
    <div className="App">
   
   <Router>
    <Routes>
      <Route path="/home" element={<HomePage/>} />

    </Routes>
   </Router>

    
    </div>
  );
}

export default App;
