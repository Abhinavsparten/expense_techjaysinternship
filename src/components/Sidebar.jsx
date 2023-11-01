import React from 'react'
import 
{BsCart3, BsGrid1X2Fill, BsFillPersonXFill, BsFillGrid3X3GapFill, BsFillTrash3Fill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill,BsFillClipboardPlusFill, BsCreditCard2Front,}
 from 'react-icons/bs'
import { Link,useNavigate } from 'react-router-dom'
import { deleteAcc } from '../service/allapi'

function Sidebar({openSidebarToggle, OpenSidebar}) {
    const navigate= useNavigate()
   //log out
    const logoutHandler = () =>{
        localStorage.removeItem('email')
        navigate('/')
    }
   //delete acc
   const deleteHandler = () =>{
    const uid=localStorage.getItem("id")
    const deteleAccCall=async()=>{
        const response=await deleteAcc(uid)
        alert(response.data)
        deteleAccCall()
    
    navigate('/')
    }
}

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <BsCart3  className='icon_header'/> Tracker
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href="dashboard">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/addexp">
                    <BsFillClipboardPlusFill className='icon'/> Add Expense
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/history">
                    <BsCreditCard2Front className='icon'/> Expense History
                </a>
            </li>
          
        
           
            <li className='sidebar-list-item'>
                <a href="/report">
                    <BsMenuButtonWideFill className='icon'/> Reports
                </a>
            </li>
            <li className='sidebar-list-item'>
                <Link to='/' onClick={logoutHandler}>
                    <BsFillPersonXFill className='icon'/> Logout
                </Link>
            </li>
            
            <li className='sidebar-list-item'>
            <Link to='/' onClick={deleteHandler}>
                    <BsFillTrash3Fill className='icon'/> Delete Account
                    </Link>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar