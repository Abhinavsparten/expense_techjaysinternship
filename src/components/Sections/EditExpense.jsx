import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
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
import { Addexpense } from '../../service/allapi';

function EditExpense() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  const uid=localStorage.getItem("id")
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

  const handleSubmit = async (e) => {
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
      const response = await Addexpense(userData)
      console.log(response);
      if (response.status == 200) {


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
      alert(response.data.message);




    }
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

            <MDBCard className='bg-white  mx-auto border' style={{ maxWidth: '500px' }}>
              <MDBCardBody className='p-5 w-100 d-flex flex-column' style={{ marginTop: '-35px',marginBottom:"-39px" }}>

                <h2 className="fw-bold mb-1 text-center" style={{ color: 'black' }}>Edit Expense</h2>

                <label className='  mb-1' style={{ color: 'black' }} ><b>Enter Text</b></label>
                <MDBInput required onChange={userDetails} wrapperClass='mb-4 w-100' name='reason' placeholder='Text' id='formControlLg' type='text' size="lg" />
                <label className=' mb-1' style={{ color: 'black' }} ><b>Enter Category</b></label>
                <select   name="category" id="cars" className='form-control mb-4' required onChange={userDetails} wrapperClass='mb-4 w-100 '  size="lg" style={{height:"50px"}} >
                  <option value="Food " >Food</option>
                  <option value="Travel">Travel</option>
                  <option value="Rent">Rent</option>
                  <option value="Rent">Medical</option>
                  <option value="Others">Others</option>
                </select>
                <label className=' mb-1' style={{ color: 'black' }} ><b>Enter Amount Rs</b></label>
                <MDBInput required onChange={userDetails} wrapperClass='mb-4 w-100' name='amount' placeholder='Amount' id='formControlLg' type='text' size="lg" />
                <label className=' mb-1' style={{ color: 'black' }} ><b>Enter Date</b></label>
                <MDBInput required onChange={userDetails} wrapperClass='mb-4 w-100' name='cdate' placeholder='cdate' id='formControlLg' type='date' size="lg" />


                <button size='lg' className='btn btn-primary  p-2 text-center ' style={{ borderRadius: '5px' }} onClick={handleSubmit}>
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