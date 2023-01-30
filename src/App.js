import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/home"

function App() {
  return (
    <BrowserRouter basename='/Todo'> 
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
