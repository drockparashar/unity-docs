import Login from "./pages/Login";
import './App.css';
import Signup from "./pages/Signup";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import  Editor  from "./pages/Editor";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
// import NewEditor from "./pages/NewEditor";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/editor/:_id" element={<Editor/>}></Route>
        <Route path="/user" element={<Dashboard/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
