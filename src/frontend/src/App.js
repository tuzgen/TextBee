import "./App.css"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { io } from "socket.io-client"
import { useState } from "react"
import LoginPage from "./Pages/LoginPage"
import HomePage from "./Pages/HomePage"
import ChatPreviews from "./Pages/ChatPreviews"
import Cookies from 'universal-cookie'

function App() {
	const [token, setToken] = useState(new Cookies().get('token') || "")

	
	if (!token) {
		return <LoginPage setToken={setToken} />
	}

	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/chats" element={<ChatPreviews />} />
					<Route path="/home" element={<HomePage />} />
				</Routes>
			</Router>
		</div>
	)
}

export default App
