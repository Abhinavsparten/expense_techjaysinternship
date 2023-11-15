import React, { useState } from 'react'
import Sidebar from '../Sidebar';
import Header from '../Header';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol, 
}
  from 'mdb-react-ui-kit';

import TableExp from './TableExp';
  
function History() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
 
    
    <div className='d-flex'>
    
    <div className='grid-container'>

      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
    </div>
    <MDBContainer fluid>
      <Header OpenSidebar={OpenSidebar} />
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
  
        <MDBCol col='12'>
        <TableExp/>
       
        </MDBCol>
      </MDBRow>

    </MDBContainer>

  </div>

  )
  

}

export default History
