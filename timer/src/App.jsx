import "./App.css"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/functionalComponents/Navbar";
import Medication from './components/functionalComponents/Medication';
import Meditation from './components/functionalComponents/Meditation';
import Signup from "./components/functionalComponents/Signup";
import Login from "./components/functionalComponents/Login";
import Home from "./components/functionalComponents/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
        <Route path="/" element={<Signup/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
          <Route path="/medication" element={<Medication/>}></Route>
          <Route path="/meditation" element={<Meditation/>}></Route>
          </Routes>{" "}
      </BrowserRouter>
    </>
  );
}

export default App;

    