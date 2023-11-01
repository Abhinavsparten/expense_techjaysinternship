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
  MDBIcon,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import { ResetPass } from '../service/allapi';

function Passreset() {
    //state to store api response erroe message
  const [errorMsg,setErrorMsg]=useState("")

  //create an object to store datas from input
  const [userData, setUser] = useState({
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
  const { email, psw} = userData
  
 if (email == "") {
    toast.error('email requierd')
  }
  else if (psw == "") {
    toast.error('password requierd')
  }
 
  else {
    localStorage.setItem("email",email)
    //api call
    const response = await ResetPass(userData)
    console.log(response);
    if(response.status==200){
  

    //reset all states datas
    setUser({
      email: "",
      psw: ""
   
    })
    

    //redirection to home
      
    }else{
      setErrorMsg(response.response.data)
    }
    alert(response.data.message);
    navigate('dashboard')


  }
  }

  return (
    <div>
    <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
  <MDBContainer fluid style={{marginTop:"33px"}}>

<MDBRow className='d-flex justify-content-center align-items-center h-100'>
<MDBCol col='12'>

<MDBCard className='bg-white my-5 mx-auto border ' style={{borderRadius: '1rem', maxWidth: '500px'}}>
  <MDBCardBody className='p-5 w-100 d-flex flex-column mb-4'>

    <h2 className="fw-bold mb-2 text-center" style={{color:'black'}}>Forget Password</h2>
    <p className="text-white-50 mb-3" style={{color:'black'}}>Please enter your login and password!</p>
    <label className='  mb-3 ms-1' style={{ color: 'black' }} ><b>Enter Your Email</b></label>

    <MDBInput required onChange={userDetails} wrapperClass='mb-4 w-100' name='email' placeholder='Email address' id='formControlLg' type='email' size="lg"/>
   
 
    <button size='lg' className='btn btn-primary  p-2 text-center mt-2  ' style={{borderRadius:'5px'}} onClick={handleSubmit}>
      Confirm
    </button>
    <a href="/" ><button  size='lg' className='btn btn-primary  p-2 text-center mt-4  ' style={{borderRadius:'5px',width:"100%"}} >
      Go Back
    </button></a>

   

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

export default Passreset