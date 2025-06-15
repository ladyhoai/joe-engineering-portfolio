import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Chess from "./pages/Chess";
import Sketch from "./pages/Sketch";
import FIAR from "./pages/FIAR";
import Warman from "./pages/Warman";
import Arm from "./pages/Arm";
import GSV from "./pages/GSV";
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="projects/chess" element={<Chess/>}/>
        <Route path="projects/sketch" element={<Sketch/>}/>
        <Route path="projects/FIAR" element={<FIAR/>}/>
        <Route path="projects/warman" element={<Warman/>}/>
        <Route path="projects/arm" element={<Arm/>}/>
        <Route path="projects/GSV" element={<GSV/>}/>
        
      </Routes>
    </Router>
  );
}

export default App
