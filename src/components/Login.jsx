import React, { useState ,useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
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
import 
 { BsPersonCircle} from 'react-icons/bs'
import Modal from 'react-bootstrap/Modal';
import { loginUser } from '../service/allapi';


function Login() {
  const [smShow, setSmShow] = useState(false);

    
  const [focus,setFocus] = useState({
    errName : false,
    errEmail : false,
    errPass : false
  })

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
          localStorage.setItem('token', response.data.token);
          toast.success(response.data.message);
        setTimeout(()=> {
          navigate('dashboard')
        }, 1500);
         
        }else{
          toast.error(response.data.message);
        }
    
      

      //reset all states datas
      setUser({
        email: "",
        psw: ""
     
      })
      

      //redirection to home
        
      }else{
        toast.error(response.data.message)
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
    <MDBContainer fluid className='gradient'>

    <MDBRow className='d-flex justify-content-center align-items-center h-100'>
      <MDBCol col='12'>
<div className='header-right ' style={{marginLeft:"91%",marginTop:"2px"}}>
          
          <Link onClick={() => setSmShow(true)}><BsPersonCircle  className='icon mt-5'/>
          </Link> 
       </div>

 <MDBCard className=' my-5 pageb  mx-auto border  bg-white' style={{backgroundColor:"rgba(255,255,255,0.55)",
   borderRadius: '2px', maxWidth: '430px',maxHeight:'512px', boxShadow:'0 10px 16px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.22)',
   marginBottom:"200px"
   }}>
   <MDBCardBody className='p-5 w-100 d-flex flex-column mt-1'>

        <h2 className="fw-bold mb-5 text-center" style={{color:'black'}}>Sign in</h2>
         <div>
        <input required onBlur={()=>setFocus({...focus,errEmail : true})} focus ={focus.errEmail.toString()} 
         className='form-control mb-3  w-100' onChange={userDetails} name='email'  placeholder='Email address' id='formControlLg' type='email' size="lg"/>
         <span className='ms-2 '>Enter a valid email id</span>
        </div>
         <div>
         <input required  pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$' onBlur={()=>setFocus({...focus,errPass : true})} focus ={focus.errPass.toString()} 
         className='form-control mb-3 w-100' onChange={userDetails} name='psw' placeholder='Password' id='formControlLg' type='password' size="lg"/>
         <span className='ms-2 '>it must have minimum 8 characters and include atleast 1 uppercase and 1 Special character</span>
        <p className="medium mb-2  pb-lg-3 text-center"><a style={{textDecoration:'none',color:'orange'}}  href="/reset">Forgot password?</a></p>
        </div>

        <button size='lg' className='btn btn-primary  p-2 text-center  ' style={{ borderRadius: '5px',backgroundColor:"#378dfc",color:"white"}}  onClick={handleSubmit}>
          login
        </button>

       

        <hr className="my-3" />

        <div className="text-center mt-1">
        <p style={{color:'black'}}>Not a member? <a href="/verify" style={{textDecoration:'none',color:'orange'}} >Register</a></p>
        </div>
        
 

      </MDBCardBody>
    </MDBCard>
    <Modal 
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Demo 
          </Modal.Title>
  

        </Modal.Header>
        <Modal.Body>
     <p className='text-dark'>   Email: abhinavmulloli1@gmail.com </p>
     <p className='text-dark' >  Password: 1234 </p></Modal.Body>
        <Modal.Footer >
    
        </Modal.Footer>
      </Modal>

    
    <ToastContainer position="top-center" />

  </MDBCol>
</MDBRow>

</MDBContainer>

    
  )
}

export default Login
