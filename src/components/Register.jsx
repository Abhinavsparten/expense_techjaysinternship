import React, { useState,useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';
  
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import { registerUser } from '../service/allapi';

function Register() {
  //state to store api response erroe message
  const [errorMsg,setErrorMsg]=useState("")

    //create an object to store datas from input
    const [userData, setUser] = useState({
      uname: "",
      email: "",
      psw: ""
  
    })
      //object for useNavigate
  const navigate=useNavigate()
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
    const { uname, email, psw} = userData
    if (uname == "") {
      toast.error('uname requierd')
    }
    else if (email == "") {
      toast.error('email requierd')
    }
    else if (psw == "") {
      toast.error('password requierd')
    }
   
    else {
     
      //api call
      const response = await registerUser(userData)
      console.log(response);
      if(response.status==200){
    
        if(response.data.message === "Registration Successfull"){
          alert(response.data.message);
          navigate('/')
         
        }else{
          alert(response.data.message);
        }

      //reset all states datas
      setUser({
        uname: "",
        email: "",
        psw: ""
     
      })
      // toast.success('RegisterSuccessfully')

     
        
      }else{
        setErrorMsg(response.response.data)
      }
     alert(response.data.message)
     

    }
  }
  //prevent for login
  useEffect(()=>{
    if(localStorage.getItem('email')){
      navigate('/')
    }
  },[navigate])
  return (
    <div>
      <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
          <MDBContainer fluid style={{marginTop:"26px"}}>

<MDBRow className='d-flex justify-content-center align-items-center h-100'>
  <MDBCol col='12'>

    <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '8px', maxWidth: '500px',boxShadow:'0 10px 16px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.22)'}}>
      <MDBCardBody className='p-5 w-100 d-flex flex-column'>

        <h2 className="fw-bold mb-2 text-center " style={{color:'black'}}>Register</h2>
        <p className="text-white-50 mb-3">Please enter your login and password!</p>
        <MDBInput required onChange={userDetails} name='uname' wrapperClass='mb-4 w-100'  placeholder='User Name' id='formControlLg' type='text' size="lg"/>
        <MDBInput required onChange={userDetails} name='email' wrapperClass='mb-4 w-100' placeholder='Email address' id='formControlLg' type='email' size="lg"/>
        <MDBInput required onChange={userDetails} name='psw' wrapperClass='mb-4 w-100' placeholder='Password' id='formControlLg' type='password' size="lg"/>

        <button size='lg' className='btn btn-primary  p-2 text-center mt-1 ' style={{borderRadius:'5px'}} onClick={handleSubmit}>
          Register
        </button>
    
        <hr className="my-3" />
 

      </MDBCardBody>
    </MDBCard>

  </MDBCol>
</MDBRow>

</MDBContainer>

    </div>
    <ToastContainer position="top-center" />
    </div>
    
  )
}

export default Register