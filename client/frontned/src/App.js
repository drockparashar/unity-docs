import Login from "./pages/Login";
import './App.css';
import Signup from "./pages/Signup";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import  Editor  from "./pages/Editor";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/editor" element={<Editor/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
