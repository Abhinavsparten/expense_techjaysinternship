import { useState,useEffect } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Home from './Home'
import { getUsers } from '../service/allapi'


function Dashboard() {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)

  }
  const email = localStorage.getItem("email")
  // console.log(email);
   //state to store all expense
   const[allExps,SetAllexps]=useState([])

   //create an object to store datas from input
  const [userData, setUser] = useState({
  
    email: email
 
  })
       //define a function to call api
       const getUserCall=async()=>{
        const response=await getUsers(userData)
        SetAllexps(response.data)
    
        const id=response.data._id
        localStorage.setItem('id',id)
        
      }

  // console.log(userData);
 
  
   useEffect(()=>{

    getUserCall()
   
  },[])
  return (
    <div className='grid-container'>
    <Header OpenSidebar={OpenSidebar}/>
    <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
    <Home />
  </div>
  )
}

export default Dashboard