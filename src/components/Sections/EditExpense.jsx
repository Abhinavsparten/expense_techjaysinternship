import React, { useState,useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import moment from 'moment';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon
}
  from 'mdb-react-ui-kit';
import { BsPlusLg } from 'react-icons/bs'
import Sidebar from '../Sidebar';
import Header from '../Header';
import { Editexpense, getsingleExp } from '../../service/allapi';


function EditExpense() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  const uid=localStorage.getItem("id")
  // param id 
  const{id} =useParams()
  console.log(id);
  //get details of the perticuler expense
  const getoneExp=async()=>{
    const {data}=await getsingleExp(id)
    setUser(data);
  

  }

  //state to store api response erroe message
  const [errorMsg, setErrorMsg] = useState("")

  //create an object to store datas from input
  const [userData, setUser] = useState({
    reason: "",
    category: "",
    amount: "",
    cdate: "",
    uid: uid

  })
  //object for useNavigate
  const navigate = useNavigate()
  // a function to update userdata when user enter the input in html
  const userDetails = (e) => {
    //prevent the event
    e.preventDefault()
    //access value to update in userData
    const { value } = e.target
    //access key to update in userData
    const key = e.target.name
    //update the data with existing data
    setUser({ ...userData, [key]: value })

  }
  console.log(userData);

  const handleEdit = async (e) => {
    e.preventDefault()
    const { reason,category, amount, cdate, uid } = userData

    if (reason == "") {
      toast.error('Text requierd')
    }
    else if (category == "") {
      toast.error('Amount requierd')
    }
    else if (amount == "") {
      toast.error('Amount requierd')
    }
    else if (cdate == "") {
      toast.error('Date requierd')
    }

    else {

      //api call
      const response = await Editexpense(id,userData)
      // console.log(response);
      if (response.status == 200) {
        alert(response.data.message);
        navigate('/dashboard')


        //reset all states datas
        setUser({
          reason: "",
          category: "",
          amount: "",
          cdate: ""

        })


        //redirection to home

      } else {
        setErrorMsg(response.response.data)
      }
     

    }
  }
  
  useEffect(()=>{
 
    getoneExp()
    
   
  },[])
  return (
    <div className='d-flex'>
      <div className='grid-container'>

        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      </div>

      <MDBContainer fluid>
        <Header OpenSidebar={OpenSidebar} />
        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol col='12'>
          <MDBCard className='bg-secondary   mx-auto border' style={{ maxWidth: '500px',boxShadow:'0 10px 16px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.22)',marginTop:"-45px"}}>
              <MDBCardBody className='p-5 w-100 d-flex flex-column' style={{ marginTop: '-35px',marginBottom:"-39px" }}>

                <h2 className="fw-bold mb-1 text-center" style={{ color: 'black' }}>Edit Expense</h2>

                <label className='  mb-1' style={{ color: 'black' }} ><b>Enter Text</b></label>
                <MDBInput required value={userData.reason} onChange={userDetails} wrapperClass='mb-4 w-100' name='reason' placeholder='Text' id='formControlLg' type='text' size="lg" />
                <label className=' mb-1' style={{ color: 'black' }} ><b>Enter Category</b></label>
                <select value={userData.category}   name="category" id="cars" className='form-control mb-4' required onChange={userDetails} wrapperClass='mb-4 w-100 '  size="lg" style={{height:"50px"}} >
                  <option value="Food " >Food</option>
                  <option value="Travel">Travel</option>
                  <option value="Rent">Rent</option>
                  <option value="Rent">Medical</option>
                  <option value="Recharge">Recharge</option>
                  <option value="Others">Others</option>
                </select>
                <label className=' mb-1' style={{ color: 'black' }} ><b>Enter Amount Rs</b></label>
                <MDBInput value={userData.amount} required onChange={userDetails} wrapperClass='mb-4 w-100' name='amount' placeholder='Amount' id='formControlLg' type='text' size="lg" />
                <label className=' mb-1' style={{ color: 'black' }} ><b>Enter Date</b></label>
                <MDBInput value={moment(userData.cdate).format("YYYY-MM-DD")} required onChange={userDetails} wrapperClass='mb-4 w-100' name='cdate' placeholder='cdate' id='formControlLg' type='date' size="lg" />


                <button size='lg' className='btn btn-primary  p-2 text-center ' style={{ borderRadius: '5px',backgroundColor:"green",color:"white"}} onClick={handleEdit}>
                  <BsPlusLg className='icon' /> Update
                </button>



                <hr className="my-3" />


              </MDBCardBody>
            </MDBCard>

          </MDBCol>
        </MDBRow>

      </MDBContainer>

      <ToastContainer position="top-center" />
    </div>



  )
}


export default EditExpense