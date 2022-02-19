import React from 'react';
import Options from './options.json';

function Client(){
    const optionList = Options.stateOptions.map((opt, key) => (
        <option key={key} values={`${opt.short}`}>{opt.full}</option>
    ));
    return(
        <div className="container">
            <h1>Client Profile Management</h1>
            <form>
            <label>Full Name
            <input type="text" maxLength="50" placeholder="Enter your full name" />
            </label>
            <label>Address 1
            <input type="text" maxLength="100" placeholder="Enter your address" />
            </label>
            <label>Address 2
            <input type="text" maxLength="100" placeholder="Enter your address" />
            </label>
            <label>City
            <input type="text" maxLength="100" placeholder="Enter your city" />
            </label>
            <label>State
            <select name="State">
                {optionList}
            </select>
            </label>
            <label>Zipcode
            <input type = "text" minLength ="5" maxLength = "9"placeholder="Enter your zipcode" />
            </label>
            <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default Client