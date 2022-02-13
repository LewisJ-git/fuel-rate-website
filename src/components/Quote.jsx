import React from 'react';
function Quote(){
    //user address
    const user_address = "17110 Main Str, Houston, Texas , 77084"
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
    <div className='quote'>
        <h1>Fuel Quote Form</h1>
        <form>
            <label>
                Gallon Requested
                <input type = "number" placeholder="Enter number of gallons" />
            </label>
            <label>
            Delivery Address
            <h3>{user_address}</h3>
            </label>
            <label>
            Delivery Date
            <input type="date" value={today}></input>
            </label>
            <label>
                Suggested Price
                <h3>{suggest_price}</h3>
            </label>
            <label>
                Total Price
                <h3>{total_price}</h3>
            </label>
        </form>
    </div>

    )
    ;
}
export default Quote