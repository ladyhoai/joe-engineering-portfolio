import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Chess from "./pages/Chess";
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="projects/chess" element={<Chess/>}/>
      </Routes>
    </Router>
  );
}

export default App
