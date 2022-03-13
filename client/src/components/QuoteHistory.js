import React, { useEffect, useState } from "react";

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

const QuoteHistory = ({ match }) => {

    var id = "Nhi Hoang";

    const [quotes, setQuotes] = useState([]);

    const getQuotes = () => {
        axios
            .get(`/quoteHistory/quote`, {
                params: { userID: id },
            })
            .then((res) => {
                console.log(res);
                setQuotes(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getQuotes();
    }, []);

    console.log(quotes); 

    return (
        <div style={{ padding: "10px" }}>            
                    <>
                        {quotes.length > 0 ? (
                            <>
                                <Typography>{`Quote History`}</Typography>
                                <TableContainer
                                    component={Paper}
                                    style={{ width: 800, paddingTop: "10px" }}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Gallons Requested</TableCell>
                                                <TableCell align="right">Delivery Address</TableCell>
                                                <TableCell align="right">Delivery Date</TableCell>
                                                <TableCell align="right">Suggested Price / gallon</TableCell>
                                                <TableCell align="right">Total Due</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {quotes.map((quote) => (
                                                <TableRow key={quote.transaction_id}>
                                                    <TableCell component="th" scope="row">
                                                        {quote.customer_name}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                    {quote.quote_time.toString().split("T")[0]}
                                                    </TableCell>
                                                    
                                                    <TableCell align="right">{quote.quantity_quoted}</TableCell>
                                                    <TableCell align="right">
                                                        {"$" + quote.total_quote_cost}
                                                    </TableCell>                                               
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </>
                        ) : (
                                <Typography align="center" style={{ padding: "100px" }}>No Quotes</Typography>
                            )}
                    </>                
        </div>
    );
};

export default QuoteHistory;