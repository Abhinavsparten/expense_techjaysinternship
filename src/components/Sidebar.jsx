import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 
{BsCart3, BsGrid1X2Fill, BsFillPersonXFill, BsFillGrid3X3GapFill, BsFillTrash3Fill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill,BsFillClipboardPlusFill, BsCreditCard2Front,}
 from 'react-icons/bs'
import { Link,useNavigate } from 'react-router-dom'
import { deleteAcc } from '../service/allapi'



function Sidebar({openSidebarToggle, OpenSidebar}) {
    const navigate= useNavigate()
    const [smShow, setSmShow] = useState(false);



   //log out
    const logoutHandler = () =>{
        localStorage.removeItem('email')
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        navigate('/')
    }
   //delete acc
   const deleteHandler = () =>{
    const id=localStorage.getItem("id")
    console.log(id);
    const deteleAccCall=async()=>{
        const response=await deleteAcc(id)
        if (response.status == 200) {
            alert("Account Deleted")
        }
    }
        deteleAccCall()
        localStorage.removeItem('email')
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        
    
    navigate('/')
  
}

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
           <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            
          </Modal.Title>
        </Modal.Header>
        <Modal.Body><h3 className='text-center text-dark b'>Are You Sure ?</h3></Modal.Body>
        <Modal.Footer >
          <Button variant="secondary" style={{ borderRadius: '10px',
          backgroundColor:"red",color:"white",marginLeft:"-50px"}} onClick={() => setSmShow(false)}>Close</Button>
          <Button variant="primary" style={{ borderRadius: '10px',
          backgroundColor:"green",color:"white"}} onClick={deleteHandler}>Confirm</Button>
        </Modal.Footer>
      </Modal>
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
            <Link   onClick={() => setSmShow(true)}>
                    <BsFillTrash3Fill className='icon'/> Delete Account
                    </Link>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar