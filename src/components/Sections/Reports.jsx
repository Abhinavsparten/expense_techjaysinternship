import React, {useState, useEffect } from "react";
import Chart from "react-apexcharts";
import Sidebar from '../Sidebar';
import Header from '../Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getTransactions } from "../../service/allapi";
import {BsCurrencyRupee}  from 'react-icons/bs'

function Reports() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
 
  const [expense, setallExpense]= useState([]);
  
  const uid = localStorage.getItem("id")


  //create an object to store datas from input
  const [userData, setUser] = useState({

    uid: uid
  })
  const [monthName, setmonthName]= useState([]);

  const [expValue, setexpValue]= useState([]);


 

  const getExpenserecord= async()=>{
    const response = await getTransactions(userData)
    // console.log(response.data);
    setallExpense(response.data)
  }
    var monthsList = [
      {label: "Jan", value: '1', dataset: 0},
      {label: "Feb", value: '2', dataset: 0},
      {label: "Mar", value: '3', dataset: 0},
      {label: "Apr", value: '4', dataset: 0},
      {label: "May", value: '5', dataset: 0},
      {label: "Jun", value: '6', dataset: 0},
      {label: "Jul", value: '7', dataset: 0},
      {label: "Aug", value: '8', dataset: 0},
      {label: "Sep", value: '9', dataset: 0},
      {label: "Oct", value: '10', dataset: 0},
      {label: "Nov", value: '11', dataset: 0},
      {label: "Dec", value: '12', dataset: 0},
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





monthlyExpenseArray.forEach(i => {

  monthsList.find(m => m.value === i.month);

  for (let j = 0; j < monthsList.length; j++) {
      if (monthsList[j].value === i.month) {
          monthsList[j].dataset +=(i.totalExpense);
      }
  }
});  

      //total food
const totalFood=expense.filter(
  (f) => f.category ==="Food").reduce((acc, t) => acc + t.amount, 0)
    //total Travel
  const totalTravel=expense.filter(
  (f) => f.category ==="Travel").reduce((acc, t) => acc + t.amount, 0)
      //total Rent
  const totalRent=expense.filter(
  (f) => f.category ==="Rent").reduce((acc, t) => acc + t.amount, 0)
     //total medical
  const totalMedical=expense.filter(
  (f) => f.category ==="Medical").reduce((acc, t) => acc + t.amount, 0)
    //total Others
  const totalRecharge=expense.filter(
      (f) => f.category ==="Recharge").reduce((acc, t) => acc + t.amount, 0)
  //total Others
  const totalOthers=expense.filter(
  (f) => f.category ==="Others").reduce((acc, t) => acc + t.amount, 0)

  


  useEffect( ()=>{
    getExpenserecord();
   

    const mName=[];
    const eValue=[];

    for(let i=0; i<monthsList.length; i++)
    {
      mName.push(monthsList[i].label);
      eValue.push(monthsList[i].dataset);

    }
    setmonthName(mName);
    setexpValue(eValue);


  },[totalFood]);

  return (
 
    
    <div className='grid-container'>
     <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
    
      
 

        <main className='main-container'>
        <h2 className="text-center">Total Expenses</h2>

      <div className='main-cards2 ' >
      
        <div className='card2 bg-secondary'>
          <div className='card-inner'>
          
            <h3 className="text-success">Food : <b >{totalFood} <BsCurrencyRupee className='icon'/></b></h3>
            <h3 className="text-success">Travel : <b >{totalTravel} <BsCurrencyRupee className='icon'/></b></h3>
            <h3 className="text-success">Medical :<b >{totalMedical} <BsCurrencyRupee className='icon'/></b></h3>
        
          </div>
          <h1></h1>
        </div>
        <div className='card2 bg-secondary '>
          <div className='card-inner'>
        
          <h3 className="text-success" >Recharge: <b >{totalRecharge} <BsCurrencyRupee className='icon'/></b></h3>
            <h3 className="text-success">Rent : <b >{totalRent} <BsCurrencyRupee className='icon'/></b></h3>
            <h3 className="text-success">Others : <b >{totalOthers} <BsCurrencyRupee className='icon'/></b></h3>
      
          </div>
          <h1></h1>
        </div>
       
      </div>
     
        <React.Fragment>
          
      <div className="container-fluid mb-5 " style={{marginTop:"12%"}}>
      
      <div>
        <a href='/generatepdf' > <button className='p-2 mb-3 mt-3  btng btn-danger'  style={{backgroundColor:"green",color:"white",borderRadius:"5px",}} >Generate Report</button></a> 
          </div>
        <Chart className='ba '
          type="bar"
         
          series={[
            {
              name: "Social Media Subscriber",
              data: expValue,
              style: { color: "white", fontSize: 12 },
            },
          ]}
          
          options={{
            title: {
              text: " ...Expenses In Each Month",
              style: { fontSize: 14 },
            },

            

            colors: ["#826de1"],
            theme: { mode: "light" },
            responsive: [
              {
                breakpoint: 1000,
                options: {
                  plotOptions: {
                    bar: {
                      horizontal: false
                    }
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              }
            ],

            xaxis: {
              
              tickPlacement: "on",
             
              categories: monthName,
             
              title: {
                text: "Month wise expense",
                style: { color: "black", fontSize: 13 },
              },
         
            },

            yaxis: {
                labels: {
                  formatter: (val) => {
                  return `${val}`;
                  },
                style: { fontSize: "12", colors: ["black"] },
              },
                 title: {
                 text: "Expense In Rs",
                 style: { color: "black", fontSize: 12 },
              },
            },

            legend: {
              show: true,
              position: "right",
            },

            dataLabels: {
              formatter: (val) => {
                return `${val}`;
              },
            
              style: {
                colors: ["black"],
                fontSize: 15,
              },
            },
          }}
        ></Chart>
          
      </div>
    </React.Fragment>
    
   
    </main>
    <ToastContainer position="top-center" />
   </div>

  )
}

export default Reports