import React, { useState ,useEffect} from 'react';
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
import { loginUser } from '../service/allapi';

function Login() {

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
     
      //api call
      const response = await loginUser(userData)
      console.log(response);
     
      if(response.status==200){
        if(response.data.message === "login Successfull"){
          localStorage.setItem("email",email)
          alert(response.data.message);
          navigate('dashboard')
         
        }else{
          alert(response.data.message);
        }
    
      

      //reset all states datas
      setUser({
        email: "",
        psw: ""
     
      })
      

      //redirection to home
        
      }else{
        setErrorMsg(response.response.data)
      }

    }
  }
    //prevent for login
    useEffect(()=>{
      if(localStorage.getItem('email')){
        navigate('dashboard')
      }
    },[navigate])
  return (
    <div>
        <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
      <MDBContainer fluid style={{marginTop:"26px"}}>

<MDBRow className='d-flex justify-content-center align-items-center h-100'>
  <MDBCol col='12'>

    <MDBCard className='bg-white my-5 mx-auto border' style={{borderRadius: '8px', maxWidth: '500px', boxShadow:'0 10px 16px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.22)'}}>
      <MDBCardBody className='p-5 w-100 d-flex flex-column'>

        <h2 className="fw-bold mb-2 text-center" style={{color:'black'}}>Sign in</h2>
        <p className="text-white-50 mb-3" style={{color:'black'}}>Please enter your login and password!</p>

        <MDBInput required onChange={userDetails} wrapperClass='mb-4 w-100' name='email' placeholder='Email address' id='formControlLg' type='email' size="lg"/>
        <MDBInput required onChange={userDetails} wrapperClass='mb-4 w-100' name='psw' placeholder='Password' id='formControlLg' type='password' size="lg"/>
        <p className="medium mb-2  pb-lg-3 text-center"><a style={{textDecoration:'none',color:'orange'}}  href="/reset">Forgot password?</a></p>
     

        <button size='lg' className='btn btn-primary  p-2 text-center  ' style={{borderRadius:'5px'}} onClick={handleSubmit}>
          login
        </button>

       

        <hr className="my-3" />

        <div className="text-center mt-1">
        <p style={{color:'black'}}>Not a member? <a href="/register" style={{textDecoration:'none',color:'orange'}} >Register</a></p>
        </div>
        
 

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

export default Login
