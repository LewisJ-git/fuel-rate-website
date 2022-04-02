import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from "react-router-dom";

function Quote(){
    const url = 'http://localhost:3001/quote'
    const [data,setData]= useState({
    gallon:"",
    date:""
    })

    const [user_id, setUserID] = useState(0);
    useEffect(() => {
        axios({
            method: "POST",
            withCredentials: true,
            url: "http://localhost:5000/auth"
        }).then((res) => {
            console.log(res.data)
            if (res.data.message === 'unauthorized') {
                return <Navigate to='/login'/>
            }
            else {
                if (res.data.user_id > 0) {
                    setUserID(res.data.user_id);
                }
            }
        })
    }, [])
    
    var suggestedPrice = 3;
    var totalAmount = 180; 
    function handle(e){
        const newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
        console.log(newData);
    }

    function submit(e){
        e.preventDefault();
        axios.post(url,{
            gallon: data.gallon,
            date: data.date
        })
        .then(res=>{
            console.log(res.data);
        })
    }
    

   
    
    return(
    <div className='Fuelquote'>
        {user_id === 0 ? 
            <p>You are not logged in</p> :
            <>
                <h1>Fuel Quote Form</h1>    
                <form onSubmit={(e)=> submit(e)}>
                    <label style={{gridArea: "label1"}}>Gallon Requested</label>
                    <input style={{gridArea: "input1"}} type = "number" onChange={(e)=>handle(e)} id="gallon" value={data.gallon} placeholder="Enter number of gallons" ></input>
                    
                    <label style={{gridArea: "label2"}}>Delivery Date</label>
                    <input style={{gridArea: "input2"}} type="date" onChange={(e)=>handle(e)} id="date" value={data.date}></input>
                
                    <label style={{gridArea: "label3"}}>Delivery Address</label>
                    <input style={{gridArea: "input3"}} type="text"  placeholder="Enter the delivery address" ></input>
                
                    <label id="pricelabel1">
                        Suggested Price<h3>{suggestedPrice}</h3>
                    </label>
                
                    <label id="pricelabel2">
                        Total Price
                        <h3>{totalAmount}</h3>
                    </label>
                    <button style={{gridArea: "but"}} type="submit">Submit</button>
                </form>
            </>
        }
    </div>

    )
    ;
}
export default Quote
