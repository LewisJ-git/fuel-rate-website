import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from "react-router-dom";

function Quote(){
    const url = 'http://localhost:5000/api/quote'
    const [data,setData]= useState({
    gallon:"",
    date:"",
    suggestedPrice:"",
    totalPrice:""
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
                    getQuotes();
                    getClient();
                   
                }
            }
        })
    }, [])
    
    //get quotes history
    const [hasPreviousQuote, setHasPreviousQuote] = useState(false);

    const getQuotes = () => {
        axios
            .get(`/api/quoteHistory`, {
                params: { user_id : user_id },
                withCredentials: true,
                //USE user_id state for id to query
            })
            .then((res) => {
                console.log(res);
                if(res.data.length!==0){
                    setHasPreviousQuote(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

  


    //get cliet info
    const [clientInfo,setclientInfo]= useState([]);
    const getClient = () => {
        axios
            .get(`/api/getClient`, {
                params: { user_id : user_id },
                withCredentials: true,
                //USE user_id state for id to query
            })
            .then((res) => {
               //console.log(res);
                setclientInfo(res.data);
                
            })
            .catch((err) => {
                console.log(err);
            });
    };
    
    
    const [isInState, setIsInState] = useState(false);
    
    {clientInfo.map((val,i,row)=>{
        if (i+1===row.length){
            if(val.state==="Texas"){
                setIsInState(true);
                
            }
            
        }
        
    })}

    
    //Pricing Module
    const margin = (1.5) * ((isInState ? 0.02 : 0.04)- (hasPreviousQuote ? 0.01 : 0.00) + (data.gallon > 1000 ? 0.02 : 0.03) + 0.10);
    const suggestedPrice=(1.5 + margin).toFixed(2);
    const totalPrice=suggestedPrice* data.gallon;
    
    function handle(e){
        const newData = {...data}
        newData[e.target.id] = e.target.value
        newData['suggestedPrice'] = suggestedPrice
        newData['totalPrice'] = totalPrice
        setData(newData)
        console.log(newData);
    }
    
    function submit(e){
        alert("Successfully Submitted");
        e.preventDefault();
        axios.post(url,{
            gallon: data.gallon,
            date: data.date,
            suggestedPrice: data.suggestedPrice,
            totalPrice: data.totalPrice
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
                        
                        {clientInfo.map((val,i,row)=>{
                        if (i+1===row.length){
                            return <label style={{gridArea: "input3"}}>{val.address1}, {val.city}, {val.state}</label>
                        }
                        
                    })}
                            
                    
                        <label id="pricelabel1">
                            Suggested Price<h3>{suggestedPrice}</h3>
                        </label>
                    
                        <label id="pricelabel2">
                            Total Price
                            <h3>{totalPrice}</h3>
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
