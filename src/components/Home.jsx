import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill }
  from 'react-icons/bs'
import { getTransactions } from "../service/allapi";
import TableExp from "./Sections/TableExp";
import {BsCurrencyRupee}  from 'react-icons/bs'

function Home() {

  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,

    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  const categories = ["Food",
    "Travel",
    "Rent",
    "Medical",
    "Recharge",
    "Others",
    ]

  const uid = localStorage.getItem("id")


  const [expense, setExp] = useState([]);

  //create an object to store datas from input
  const [userData, setUser] = useState({

    uid: uid

  })
  let amount = [];
  
 
  const getalldata = async () => {
    const response = await getTransactions(userData)
    setExp(response.data)
   
  }
  const noOfexp=(expense.length-1)
 
  //total expense
  const totalExp=expense.reduce((acc, t) => acc + t.amount, 0)
   
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
  //total recharge
const totalRecharge=expense.filter(
  (f) => f.category ==="Recharge").reduce((acc, t) => acc + t.amount, 0)
//total Others
const totalOthers=expense.filter(
(f) => f.category ==="Others").reduce((acc, t) => acc + t.amount, 0)

amount=[totalFood,totalTravel,totalRent,totalMedical,totalRecharge,totalOthers]

  useEffect(() => {
  
   
    getalldata();

  }, [userData]);


  return (
  
    <main className='main-container'>
      <div className='main-title'>
        <h3 className="text-dark">DASHBOARD</h3>
      </div>

      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <h3 className="text-dark">TOTAL EXPENSE</h3>
            <BsFillArchiveFill className='card_icon' />
          </div>
          <h1>{totalExp}<BsCurrencyRupee className='icon'/></h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3 className="text-dark">CATEGORIES</h3>
            <BsFillGrid3X3GapFill className='card_icon' />
          </div>
          <h1>6</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3 className="text-dark">EXPENSES ADDED</h3>
            <BsPeopleFill className='card_icon' />
          </div>
          <h1>{noOfexp}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3 className="text-dark">ALERTS</h3>
            <BsFillBellFill className='card_icon' />
          </div>
          <h1>8</h1>
        </div>
      </div>

      <div className='charts'>
        <React.Fragment>
          <div className=" mb-3 text-white fontspie " style={{ marginLeft: "-20px" }}>
            <h3 className="mt-3 ms-5 text-dark">Analysis Of Expenses </h3>
            <Chart  className='d-flex text-white pies '
              type="pie"
             series={amount}
             

              options={{
                title: {
                  text: "Category Wise Expenses"
                },
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
                noData: { text: "Empty Data" },
                // colors:["#f90000","#f0f"],
                labels: categories

              }}
            >
            </Chart>
          </div>
        </React.Fragment>


      </div>
      <TableExp></TableExp>
    </main>
  )
}

export default Home