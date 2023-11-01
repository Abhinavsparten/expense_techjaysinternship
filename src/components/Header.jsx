import React from 'react'
import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'

function Header({OpenSidebar}) {
  return (
    <header className='header'>
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
       src="https://i.postimg.cc/Pr0b6GsQ/images-3.jpg"
       width="30"
       height="30"
       className="d-inline-block align-top"
     />{' '}
     <strong style={{color:'White'}} className='fs-3 ms-3'>Tracker</strong>
        </div>
        <div className='header-right '>
            <BsFillBellFill className='icon' />
            <BsFillEnvelopeFill className='icon ms-1'/>
            <BsPersonCircle className='icon ms-2'/>
        </div>
    </header>
  )
}

export default Header