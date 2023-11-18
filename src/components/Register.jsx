import React, { useState,useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsPersonCircle} from 'react-icons/bs'
import { Link, useNavigate, useParams } from 'react-router-dom';
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


  
  const [focus,setFocus] = useState({
    errName : false,
    errEmail : false,
    errPass : false
  })

  const{email} =useParams()

    //create an object to store datas from input
    const [userData, setUser] = useState({
      uname: "",
      email: email,
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
          toast.success(response.data.message);
          setTimeout(()=> {
            navigate('/')
          }, 1500);
         
        }else{
          toast.error(response.data.message);
        }

      //reset all states datas
      setUser({
        uname: "",
        email: email,
        psw: ""
     
      })
      // toast.success('RegisterSuccessfully')

     
        
      }else{
        setErrorMsg(response.response.data)
      }
    }
  }
  //prevent for login
  useEffect(()=>{
    if(localStorage.getItem('email')){
      navigate('/')
    }
  },[navigate])
  return (
    <div className="gradient"  >
    <div >
   <MDBContainer fluid style={{marginTop:"1px"}}>
   <div className='header-right ' style={{marginLeft:"91%"}}>
          
          <Link ><BsPersonCircle  className='icon mt-5'/></Link> 
       </div>

<MDBRow className='d-flex justify-content-center align-items-center '>
<MDBCol col='12'>

<MDBCard className=' my-5 pageb mx-auto border  bg-white' style={{backgroundColor:"rgba(255,255,255,0.55)",
   borderRadius: '2px', maxWidth: '430px',maxHeight:'510px', boxShadow:'0 10px 16px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.22)',
   }}>
   <MDBCardBody className='p-5 w-100 d-flex flex-column mt-1'>

        <h2 className="fw-bold mb-3 text-center " style={{color:'black'}}>Register</h2>
       <div>
        <input required onBlur={()=>setFocus({...focus ,errName : true})} focus ={focus.errName.toString()}
        pattern='^[A-Za-z0-9].{2,16}' className='form-control mb-3  w-100' onChange={userDetails}
         name='uname'  placeholder='User Name' id='formControlLg' type='text' size="lg"/>
         <span className='ms-2'>Username Should have 3-16 characters</span>
         </div>
         <div>
        <input required disabled value={email} onBlur={()=>setFocus({...focus,errEmail : true})} focus ={focus.errEmail.toString()}  className='form-control mb-3  w-100' onChange={userDetails}
         name='email'  placeholder='Email address' id='formControlLg' type='email' size="lg"/>
         <span className='ms-2'>Enter a valid email id</span>
         </div>
         <div>
        <input required onBlur={()=>setFocus({...focus,errPass : true})} focus ={focus.errPass.toString()}
         pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$' className='form-control mb-3  w-100' onChange={userDetails}
         name='psw' placeholder='Password' id='formControlLg' type='password' size="lg"/>
         <span className='ms-2'>it must have minimum 8 characters and include atleast 1 uppercase and 1 Special character</span>
         </div>
         
        <p className="medium mb-1  pb-lg-3 text-center"><a style={{textDecoration:'none',color:'orange'}}  href="/">Back to Login</a></p>
        
        <button size='lg' className='btn btn-primary  p-2 text-center ' style={{ borderRadius: '5px',backgroundColor:"#378dfc",color:"white"}} onClick={handleSubmit}>
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