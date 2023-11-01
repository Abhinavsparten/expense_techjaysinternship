import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Sidebar from '../Sidebar';
import Header from '../Header';
import {DatePicker,Form,Select} from "antd";
import moment from 'moment';

import {BsArrowRightShort,BsArrowLeftShort,BsPencilSquare,BsFillTrash3Fill} from 'react-icons/bs'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol, 
}
  from 'mdb-react-ui-kit';
import { getHIstory } from '../../service/allapi';
  
const { RangePicker } = DatePicker;
function History() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }


  const uid=localStorage.getItem("id")
  console.log(uid);
  //date picker
  const [selectedDate ,setSelectedate] = useState([])
  //frequency date
  const [frequency, setFrequency] = useState("7");
 
 
  const[category ,setCategory]=useState('all')
  //create a state to store search data
  const[searchKey,setSearchKey]=useState("") 
   //state to store all expense
   const[allExp,SetAllexp]=useState([])
   //create an object to store datas from input
  const [userData, setUser] = useState({
  
    uid:uid,
    frequency,
    selectedDate,
    category
  })
  console.log(frequency);
  
     //reset all states datas
   // a function to update userdata when user enter the input in html
   const userDetails = (e) => {
    //prevent the event
    e.preventDefault()
   
    //update the data with existing data
    setUser({ ...userData, frequency,category })
    

  }

  console.log(userData);

  const [currentPage,setCurrentPage] = useState(1)
   const recordsPerPage = 4;
   const lastIndex = currentPage * recordsPerPage;
   const firstIndex = lastIndex - recordsPerPage;
   const records = allExp.slice(firstIndex, lastIndex);
   const npages =Math.ceil(allExp.length / recordsPerPage);
   const numbers = [...Array(npages+1).keys()].slice(1)

 
  

   useEffect(()=>{
       //define a function to call api
   const getHIstoryCall=async()=>{
    const response=await getHIstory(userData)
    SetAllexp(response.data)
  
 }
    getHIstoryCall()
    
   
  },[frequency,selectedDate,category])
 

   // console.log(registerData);
  return (
    
    <div className='d-flex'>
    <div className='grid-container'>

      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
    </div>

    <MDBContainer fluid>
      <Header OpenSidebar={OpenSidebar} />
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
  
        <MDBCol col='12'>
          <h1 className='text-center text-white '>Expense History</h1>
          <div className='d-flex'>
        
          <div className='ms-3'>
          <h6>Select Frequency</h6>
          <Select value={frequency} onClick={userDetails} onChange={(values) => setFrequency(values)}>
            <Select.Option value="7">LAST 1 Week</Select.Option>
            <Select.Option value="30">LAST 1 Month</Select.Option>
            <Select.Option value="365">LAST 1 year</Select.Option>
            <Select.Option value="custom">custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectedate(values)}
            />
          )}
        </div>
            <div className=' ms-4'>
              <h6>Select Category</h6>
              <Select value={category}onClick={userDetails} onChange={(values) => setCategory(values)}>
                <Select.Option value='all'>All data </Select.Option>
                <Select.Option value='Food'>Food</Select.Option>
                <Select.Option value='Travel'>Travel</Select.Option>
                <Select.Option value='Rent'>Rent</Select.Option>
              </Select>
            
            </div>
       
      </div>
        <Table className=' mt-5 text-center container w-75  fs-5 border' responsive striped bordered hover variant="primary" >
    <thead className='bg-white' style={{backgroundColor:"white"}} >
      <tr  >
        <th>No</th>
        <th>Expense</th>
        <th>Category</th>
        <th>Amount</th>
        <th>Date</th>
        <th>Actions</th>
        

      </tr>
    </thead>
    <tbody>
      {
        records.length > 0 ? records.map((i,index) => (
          <tr>
          <td>{index+1}</td>
          <td>{i.reason}</td>
          <td>{i.category}</td>
          <td>{i.amount}</td>
          <td>{moment(i.cdate).format("YYYY/MM/DD ")}</td>
          <td><a href='editexp/:id'><BsPencilSquare className=' ms-1 icon'/></a> <a><BsFillTrash3Fill className='ms-2 icon'/></a></td>
  
       
        </tr>
        )
          ):<p className='text-danger text-center ms-5'>No Eployees are present</p>
      }
     
   

    </tbody>
  </Table>
  <nav className=' fs-5 p-5 ' style={{justifyContent:"center",marginLeft:'36%'}} >
    <ul className='pagination '>
      <li className='page-item ' >
        <a href='#' className='page-link bg-white text-dark border' onClick={prePage}><BsArrowLeftShort className='icon'/> Prev</a>    

      </li>
      {
        numbers.map((n, i)=>(
          <li className={`page-item ${currentPage === n ? 'active' : ''}`}key={i}>
            <a className='page-link bg-primary border' onClick={()=>changeCpage(n)}>{n}</a>
          </li>

        ))
      }
        <li className='page-item'>
        <a href='#' className='page-link bg-white text-dark border' onClick={nextPage}>Next  <BsArrowRightShort className='icon'/></a>    

      </li>
    </ul>
  </nav>
       
        </MDBCol>
      </MDBRow>

    </MDBContainer>

  </div>

  )
  function prePage(){
    if(currentPage !== firstIndex){
      setCurrentPage(currentPage - 1)
    }

  }
  function nextPage(){
    if(currentPage !== lastIndex){
      setCurrentPage(currentPage + 1)
    }

  }

  function changeCpage(id){
    setCurrentPage(id)

  }
  

}

export default History
