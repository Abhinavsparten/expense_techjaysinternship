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
    <div className='gradient' >
           <div >
   <MDBContainer fluid >
   <div className='header-right ' style={{marginLeft:"91%"}}>
          
           <Link onClick={() => setSmShow(true)}><BsPersonCircle  className='icon mt-5'/>
           </Link> 
        </div>

<MDBRow className='d-flex justify-content-center align-items-center h-100 '>
<MDBCol col='12'>

 <MDBCard className=' my-5 mx-auto border page bg-secondary' style={{backgroundColor:"rgba(255,255,255,0.55)",
   borderRadius: '8px', maxWidth: '500px', boxShadow:'0 10px 16px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.22)',
   }}>
   <MDBCardBody className='p-5 w-100 d-flex flex-column mt-1'>

        <h2 className="fw-bold mb-5 text-center" style={{color:'black'}}>Sign in</h2>

        <MDBInput required onChange={userDetails} wrapperClass='mb-4 w-100' name='email' placeholder='Email address' id='formControlLg' type='email' size="lg"/>
        <MDBInput required onChange={userDetails} wrapperClass='mb-4 w-100' name='psw' placeholder='Password' id='formControlLg' type='password' size="lg"/>
        <p className="medium mb-2  pb-lg-3 text-center"><a style={{textDecoration:'none',color:'orange'}}  href="/reset">Forgot password?</a></p>
     

        <button size='lg' className='btn btn-primary  p-2 text-center  ' style={{ borderRadius: '5px',backgroundColor:"#378dfc",color:"white"}}  onClick={handleSubmit}>
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

    </div>
    <ToastContainer position="top-center" />
    </div>
  )
}

export default Login
