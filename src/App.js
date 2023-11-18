
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AddExpense from './components/Sections/AddExpense';
import EditExpense from './components/Sections/EditExpense';
import History from './components/Sections/History';
import Reports from './components/Sections/Reports';
import Passreset from './components/Passreset';
import Updatepass from './components/Updatepass';
import Generatepdf from './components/Sections/Generatepdf';
import Verifyemail from './components/Verifyemail';



function App() {

  return (
    <div className="App">
  
       <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='registeruser/:email' element={<Register/>}></Route> 
      <Route path='verify' element={<Verifyemail/>}></Route> 
      <Route path='dashboard' element={<ProtectedRoutes><Dashboard/></ProtectedRoutes>}></Route>
      <Route path='addexp' element={<AddExpense/>}></Route>
      <Route path='editexp/:id' element={<EditExpense/>}></Route>
      <Route path='history' element={<History/>}></Route>
      <Route path='report' element={<Reports/>}></Route>
      <Route path='reset' element={<Passreset/>}></Route>
      <Route path='updatepass/:id' element={<Updatepass/>}></Route>
      <Route path='generatepdf' element={<Generatepdf/>}></Route>
      
     
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
