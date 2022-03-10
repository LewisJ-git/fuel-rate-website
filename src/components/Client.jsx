import React, {useState} from 'react';
import Options from './options.json';
import axios from 'axios';

function Client(){
    const optionList = Options.stateOptions.map((opt, key) => (
        <option key={key} values={`${opt.short}`}>{opt.full}</option>
    ));
    const url = ''
    const [data,setData] = useState({
        fullname :"",
        address1:"",
        address2:"",
        city:"",
        state:"",
        zipcode:""
    })

    function handle(e){
        const newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
        console.log(newData);
    }

    function submit(e){
        e.preventDefault();
        axios.post(url,{
            fullname :data.fullname,
            address1: data.address1,
            address2: data.address2,
            city: data.city,
            state: data.state,
            zipcode:data.zipcode
        })
        .then(res=>{
            console.log(res.data);
        })
    }
    return(
        <div className="Clientpage">
            <div className='client-wrapper'>
                <h1>Client Profile Management</h1>
                <form onSubmit={(e)=> submit(e)}>
                    <label style={{gridArea: "label1"}}>Full Name</label>
                    <input type="text" onChange={(e)=>handle(e)} id="fullname" value={data.fullname} maxLength="50" placeholder="Enter your full name" style={{gridArea: "input1"}}/>

                    <label style={{gridArea: "label2"}}>Address 1</label>
                    <input type="text" onChange={(e)=>handle(e)} id="address1" value={data.address1} maxLength="100" placeholder="Enter your address" style={{gridArea: "input2"}}/>

                    <label style={{gridArea: "label3"}}>Address 2</label>
                    <input type="text" onChange={(e)=>handle(e)} id="address2" value={data.address2} maxLength="100" placeholder="Enter your address" style={{gridArea: "input3"}}/>

                    <label style={{gridArea: "label4"}}>City</label>
                    <input type="text" onChange={(e)=>handle(e)} id="city" value={data.city} maxLength="100" placeholder="Enter your city" style={{gridArea: "input4"}}/>

                    <label style={{gridArea: "label5", marginTop: "20px"}}>State</label>
                    <select name="State" onChange={(e)=>handle(e)} id="state" value={data.state} style={{gridArea: "input5"}}>
                        {optionList}
                    </select>

                    <label style={{gridArea: "label6", marginTop: "20px"}}>Zipcode</label>
                    <input type = "text" onChange={(e)=>handle(e)} id="zipcode" value={data.zipcode} minLength ="5" maxLength = "9" placeholder="Enter your zipcode" style={{gridArea: "input6"}}/>

                    <button style={{gridArea: "but"}} type="submit">Save</button>
                </form>
            </div>
        </div>
    );
}

export default Client
