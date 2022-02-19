import React from 'react';
import Options from './options.json';

function Client(){
    const optionList = Options.stateOptions.map((opt, key) => (
        <option key={key} values={`${opt.short}`}>{opt.full}</option>
    ));
    return(
        <div className="Clientpage">
            <div className='client-wrapper'>
                <h1>Client Profile Management</h1>
                <form>
                    <label style={{gridArea: "label1"}}>Full Name</label>
                    <input type="text" maxLength="50" placeholder="Enter your full name" style={{gridArea: "input1"}}/>

                    <label style={{gridArea: "label2"}}>Address 1</label>
                    <input type="text" maxLength="100" placeholder="Enter your address" style={{gridArea: "input2"}}/>

                    <label style={{gridArea: "label3"}}>Address 2</label>
                    <input type="text" maxLength="100" placeholder="Enter your address" style={{gridArea: "input3"}}/>

                    <label style={{gridArea: "label4"}}>City</label>
                    <input type="text" maxLength="100" placeholder="Enter your city" style={{gridArea: "input4"}}/>

                    <label style={{gridArea: "label5", marginTop: "20px"}}>State</label>
                    <select name="State" style={{gridArea: "input5"}}>
                        {optionList}
                    </select>

                    <label style={{gridArea: "label6", marginTop: "20px"}}>Zipcode</label>
                    <input type = "text" minLength ="5" maxLength = "9" placeholder="Enter your zipcode" style={{gridArea: "input6"}}/>

                    <button style={{gridArea: "but"}} type="submit">Save</button>
                </form>
            </div>
        </div>
    );
}

export default Client