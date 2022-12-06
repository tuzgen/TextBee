import './App.css';
import { io } from "socket.io-client"


const socket = io("http://localhost:4000")

function App() {
  socket.on("connect", () => {
    console.log("bagli")
  })
  return (
    <div className="App">
    </div>
  );
}

export default App;
