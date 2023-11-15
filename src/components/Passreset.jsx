import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import { BsPersonCircle} from 'react-icons/bs'
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

  const uid=localStorage.getItem("id")

  
    //state to store api response erroe message
  const [errorMsg,setErrorMsg]=useState("")

  //create an object to store datas from input
  const [userData, setUser] = useState({
    email: "",
    uid

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
  const { email,uid } = userData
  
 if (email == "") {
    toast.error('email requierd')
  }
 
  else {
   
    //api call
    const response = await ResetPass(userData)
    console.log(response);
    if(response.status==200){

      alert(response.data.message);
  

    //reset all states datas
    setUser({
      email: ""
   
    })
    

    //redirection to home
      
    }else{
      setErrorMsg(response.response.data)
    }
    alert(response.data.message);
    


  }
  }

  return (
    <div>
       <div className="gradient" >
      <MDBContainer fluid style={{marginTop:"10px"}}>
      <div className='header-right ' style={{marginLeft:"91%"}}>
          
          <Link ><BsPersonCircle  className='icon mt-5'/></Link> 
       </div>

<MDBRow className='d-flex justify-content-center align-items-center h-100'>
  <MDBCol col='12'>

    <MDBCard className=' my-5 mx-auto border page bg-secondary' style={{backgroundColor:"rgba(255,255,255,0.55)",
      borderRadius: '8px', maxWidth: '500px', boxShadow:'0 10px 16px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.22)',
      backdropFilter:'blur(7.1px)'}}>
      <MDBCardBody className='p-5 w-100 d-flex flex-column mb-5'>

    <h2 className="fw-bold mb-5 text-center" style={{color:'black'}}>Forget Password</h2>

    <label className='  mb-3 ms-1' style={{ color: 'black' }} ><b>Enter Your Email</b></label>

    <MDBInput required onChange={userDetails} wrapperClass='mb-4 w-100' name='email' placeholder='Email address' id='formControlLg' type='email' size="lg"/>
   
 
    <button size='lg' className='btn btn-primary  p-2 text-center mt-3  ' style={{ borderRadius: '5px',backgroundColor:"#378dfc",color:"white"}} onClick={handleSubmit}>
      Confirm
    </button>
    <a href="/" ><button  size='lg' className='btn btn-primary  p-2 text-center mt-4  ' style={{borderRadius:'5px',width:"100%",backgroundColor:"#378dfc",color:"white"}} >
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