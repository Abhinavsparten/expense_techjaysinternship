
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import AddExpense from './components/Sections/AddExpense';
import EditExpense from './components/Sections/EditExpense';
import History from './components/Sections/History';
import Reports from './components/Sections/Reports';
import Passreset from './components/Passreset';







function App() {

  return (
    <div className="App">
      
      
       <Routes>
      <Route path='/' element={<Login/>}></Route>  
      <Route path='register' element={<Register/>}></Route> 
      <Route path='dashboard' element={<ProtectedRoutes><Dashboard/></ProtectedRoutes>}></Route>
      <Route path='addexp' element={<AddExpense/>}></Route>
      <Route path='editexp/:id' element={<EditExpense/>}></Route>
      <Route path='history' element={<History/>}></Route>
      <Route path='report' element={<Reports/>}></Route>
      <Route path='reset' element={<Passreset/>}></Route>
      
     
    </Routes>
   
    </div>

  );
}
export function ProtectedRoutes(props){
  if(localStorage.getItem('email')){
    return props.children
  }
  else{
    return <Navigate to="/"/>
  }
}

export default App;
