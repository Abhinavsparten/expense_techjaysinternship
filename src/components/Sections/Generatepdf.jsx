import React, {useState, useEffect,useRef } from "react";
import { Button, DatePicker, Select } from "antd";
import { BsSearch } from 'react-icons/bs'
import { getHIstory } from "../../service/allapi";
import { useReactToPrint } from "react-to-print";
import {BsCurrencyRupee}  from 'react-icons/bs'
import Card from 'react-bootstrap/Card';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBCardHeader,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import Header from "../Header";
import Sidebar from "../Sidebar";
const { RangePicker } = DatePicker;
function Generatepdf() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

    const componentPDF = useRef();  
    var today = new Date(),
    date =  today.getDate()+ '-' + (today.getMonth() + 1) + '-' + today.getFullYear() ;
    const uid = localStorage.getItem("id")
    const user = localStorage.getItem("user")
    const category="all"
    const [expense, setallExpense]= useState([]);
   
  
    //date picker
    const [selectedDate ,setSelectedate] = useState([])
    //frequency date
    const [frequency, setFrequency] = useState("30");

    const [expData, setExpdata] = useState({
  
      uid:uid,
      frequency,
      category,
      selectedDate
  
    })
    console.log(expData);

       // a function to update userdata when user enter the input in html
   const userDetails = (e) => {
    //prevent the event
    e.preventDefault()
   
    //update the data with existing data
    setExpdata({ ...expData, frequency,selectedDate })
   }

   
    const getFilterdexpense= async()=>{
      const response = await getHIstory(expData)
      setallExpense(response.data)
      console.log(expense);
    }
    var CategoryList = [
      {label: "Food",  dataset:0},
      {label: "Travel",  dataset: 0},
      {label: "Rent", dataset: 0},
      {label: "Medical", dataset: 0},
      {label: "Recharge",  dataset: 0},
      {label: "Others",  dataset: 0},
     

  ]

  // Create an object to store the total expenses for each month
  const monthlyExpenses = {};

  // Iterate through the expenses and accumulate the expenses for each month
  expense.forEach(exp => {
    const date = new Date(exp.cdate); // Parse the date string into a Date object
    const monthKey = date.getMonth()+1; 
    if (!monthlyExpenses[monthKey]) {
      monthlyExpenses[monthKey] = 0;
    }
    monthlyExpenses[monthKey] += exp.amount;
  
  });
  //convert result to Array of objects
const monthlyExpenseArray = Object.keys(monthlyExpenses).map(monthKey => ({
  month: monthKey, 
  totalExpense: monthlyExpenses[monthKey],
}));
// console.log(monthlyExpenseArray);

  //total expense
  const totalExp=monthlyExpenseArray.reduce((acc, t) => acc + t.totalExpense, 0)
  console.log(totalExp);


expense.forEach(i => {

  CategoryList.find(c => c.label === i.category);

  for (let j = 0; j < CategoryList.length; j++) {
      if (CategoryList[j].label === i.category) {
        CategoryList[j].dataset +=(i.amount);
      }
  }
});  
console.log(CategoryList);
   

  useEffect( ()=>{
    getFilterdexpense()

  },[frequency,selectedDate,expData]);

  const generatePDF=useReactToPrint({
    content: ()=>componentPDF.current,
    documentTitle:"user data",
    onAfterPrint:()=>toast.success("data saved in pdf")
    
   
  })

  return (
    <div className='grid-container' >
           <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <main className='main-container'>
       <h2 className='text-center text-dark mt-1'>Generate Report</h2>
        <div className='history-table'>
        
        <div className='ms-3'>
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values)} className="sel">
            <Select.Option value="30">LAST 30 days</Select.Option>
            <Select.Option value="365">LAST 1 year</Select.Option>
            <Select.Option value="custom">Costum</Select.Option>
           
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectedate(values)}
            />
          )}
        </div>
         <div>
        <a > <button onClick={userDetails} className='p-2  mt-4 btn btn-danger addbtn ms-3'   style={{backgroundColor:"green",color:"white",borderRadius:"5px"}} ><BsSearch className=' ms-1 icon'/></button></a> 
          </div>
          <div>
         <button onClick={generatePDF} className='p-2  btn btn-danger btng w-100 mt-4'  style={{backgroundColor:"green",color:"white",borderRadius:"5px"}} >Print PDF</button>
          </div>
      
    </div>
    <div>
        <a href='/report' > <button className='p-2  btn btn-danger btng'  style={{backgroundColor:"green",color:"white",borderRadius:"5px",marginLeft:"65%"}} > Go back</button></a> 
          </div>
          
          <div ref={componentPDF} style={{width:"100%"}} >
            
          <MDBCard className="mx-auto mt-4 bg-secondary mb-4 " style={{ maxWidth: '540px', boxShadow:'0 10px 16px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.22)',height:"600px"}}>
      <MDBRow className='g-2 '>
   
        <MDBCardHeader  className="text-white " id="cardh" style={{backgroundColor:"green",height:"75px"}}><h3 className="text-center">MONTHLY EXPENSE REPORT 2023</h3></MDBCardHeader>
       
          <p  className='text-success ms-3'><b>Date: {date}</b></p>
          <p  className='text-success ms-3' style={{marginTop:"-12px"}} ><b>User: {user}</b></p>
          <MDBCardBody className="report " >
            
          {
        CategoryList.length > 0 ? CategoryList.map((i) => (
          <Card className=" bg-white mb-2 p-0 text-center"   >
       
        <Card.Body>
          <Card.Title className="text-success"><b className="category">{i.label} :{i.dataset} <BsCurrencyRupee className='category'/></b></Card.Title>
         
        </Card.Body>
      </Card>
        )
        ):<p className='text-danger text-center ms-5'>No Data Present</p>
    }
   
            <MDBCardTitle className="text-dark"></MDBCardTitle>
            <MDBCardText className="text-dark">
           
            </MDBCardText>
         
          </MDBCardBody>
          <MDBCardText>
             <p> <h4 className='text-success text-center texp'><b>Total Expense : {totalExp}<BsCurrencyRupee className='icon'/></b> </h4></p>
            </MDBCardText>
        
      </MDBRow>
    </MDBCard>
</div>
</main>
<ToastContainer position="top-center" />
    </div>
    
  )
}

export default Generatepdf