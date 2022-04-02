import React, { useEffect, useState, } from "react";

import {
    Typography,
    Paper,
} from "@material-ui/core";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import axios from "axios";
import { Navigate } from "react-router-dom";


const QuoteHistory = ({ match }) => {
        
    const [user_id, setUserID] = useState(0);
    useEffect(() => {
        axios({
            method: "POST",
            withCredentials: true,
            url: "http://localhost:5000/auth"
        }).then((res) => {
            console.log(res.data);
            if (res.data.message === 'unauthorized') {             
                return <Navigate to='/login'/>
            }
            else {
                setUserID(res.data.user_id);          
            }
        })
        getQuotes();
    }, []);

    const [quotes, setQuotes] = useState(0);

    const getQuotes = () => {
        axios
            .get(`/quoteHistory/quote`, {
                params: { user_id : user_id },
                //USE user_id state for id to query
            })
            .then((res) => {
                console.log(res);
                setQuotes(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };


    console.log(quotes);

    return (
        <div style={{ padding: "100px" }}>            
                    <>
                        {quotes.length > 0 ? (
                            <>
                                <Typography align="center" style={{fontSize: 30, backgroundColor: '#819595', color: 'white', padding: "10px", fontWeight: "bold" }}>
                                    {`Quote History`}</Typography>
                                <TableContainer
                                    component={Paper}
                                    style={{ width: 1165, paddingTop: "0px" }}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="left" style={{backgroundColor: '#696773', color: 'white'}}>Quote ID</TableCell>
                                                <TableCell align="left" style={{backgroundColor: '#696773', color: 'white'}}>Gallons Requested</TableCell>
                                                <TableCell align="left" style={{backgroundColor: '#696773', color: 'white'}}>Delivery Address</TableCell>
                                                <TableCell align="left" style={{backgroundColor: '#696773', color: 'white'}}>Delivery Date</TableCell>
                                                <TableCell align="right" style={{backgroundColor: '#696773', color: 'white'}}>Suggested Price / gallon</TableCell>
                                                <TableCell align="right" style={{backgroundColor: '#696773', color: 'white'}}>Total Due</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {quotes.map((quote) => (
                                                <TableRow key={quote.quote_id}>
                                                    <TableCell align = "left" component="th" scope="row">{"#" + quote.quote_id}</TableCell>
                                                    <TableCell align="left">{quote.gallon}</TableCell>
                                                    <TableCell align="left">{quote.address1} {quote.address2}, {quote.city}, {quote.state}, {quote.zipcode}</TableCell>
                                                    <TableCell align="left">{quote.delivery.toString().split("T")[0]}</TableCell>                                            
                                                    <TableCell align="right">{"$" + quote.suggestedPrice}</TableCell>
                                                    <TableCell align="right">{"$" + quote.totalPrice}</TableCell>                                               
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </>
                        ) : (
                                <Typography align="center" style={{ padding: "100px" }}>You are not logged in or No Quotes</Typography>
                            )}
                    </>                
        </div>
    );
};

export default QuoteHistory;