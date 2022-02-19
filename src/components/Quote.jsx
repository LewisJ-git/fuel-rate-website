import React, { useState } from 'react';
function Quote(){
    //user address
    function handleChange(event) {
        console.log(event.target.value);
    }
    //get current date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    //get suggested Price / gallon
    var suggest_price = "$3.00"
    //total price
    var total_price = "$250.00"
    today =  yyyy+'-'+ mm +'-' +dd;
    
    return(
    <div className='Fuelquote'>
        <h1>Fuel Quote Form</h1>    
        <form>
            <label className="form-label-quote">Gallon Requested</label>
            <input type = "number" onChange={handleChange} placeholder="Enter number of gallons" ></input>
            
            <label className="form-label-quote">Delivery Date</label>
            <input type="date" onChange={handleChange} value={today}></input>

            <label className="form-label-quote">Delivery Address</label>
            <input type="text" onChange={handleChange} placeholder="Enter the delivery address" ></input>

            <label id="pricelabel1">
                Suggested Price<h3>{suggest_price}</h3>
            </label>

            <label id="pricelabel2">
                Total Price
                <h3>{total_price}</h3>
            </label>
        </form>
    </div>

    )
    ;
}
export default Quote