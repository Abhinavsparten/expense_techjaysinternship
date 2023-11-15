import { useState,useEffect } from 'react';
import 
 {BsFillBellFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'
 import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'
import { getUsers } from '../service/allapi'

function Header({OpenSidebar}) {
  const [smShow, setSmShow] = useState(false);
  const [user, setUserdata] = useState({})

  const email = localStorage.getItem("email")
  const [userData, setUser] = useState({
  
    email: email
 
  })
       //define a function to call api
       const getUserCall=async()=>{
        const response=await getUsers(userData)  
      setUserdata(response.data);
     

      }
      const name=user.uname
      localStorage.setItem('user',name)
      
    
        
   useEffect(()=>{

    getUserCall()
   
  },[])
      
  return (
    <header className='header '>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
        <img id='d2' style={{
       height:'50px',
       width:'50px',
       borderRadius:'40px'
     }}
       alt=""
       src="https://i.postimg.cc/Kcn9Sr0j/OIP-1.jpg"
       width="30"
       height="30"
       className="d-inline-block align-top"
     />{' '}
     <strong style={{color:'black'}} className='fs-3 ms-1 mt-5'>Tracker Pro</strong>
        </div>
        <div className='header-right '>
           <BsFillBellFill className='icon' />
           <Link onClick={() => setSmShow(true)}><BsPersonCircle className='icon ms-2'/></Link> 
        </div>
        <Modal 
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            
          </Modal.Title>
          <img id='d2' style={{
       height:'90px',
       width:'90px',
       borderRadius:'40px',marginLeft:"33%"
     }}
       alt=""
       src="https://i.postimg.cc/63LTXDFm/OIP-2.jpg"
     
       className="d-inline-block align-top"
     />

        </Modal.Header>
        <Modal.Body><h3 className='text-center'><strong style={{color:'black'}} className=' mt-5'> {name}</strong></h3></Modal.Body>
        <Modal.Footer >
    
        </Modal.Footer>
      </Modal>
    </header>
  )
}

export default Header