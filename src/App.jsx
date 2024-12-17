import { useState } from "react";
import EmployeeForm from "./components/Form";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div className="title">
        <h1>Employee Management System</h1>
        <EmployeeForm />
      </div>
    </div>  
  );
}

export default App;
