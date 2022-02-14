import React from "react";
import './QuoteHistory.css';
import axios from "axios";

const QuoteHHistory = () => {
    const [customers, setCustomers] = React.useState([])

    React.useEffect(() => {
        getData()
    }, [])

    const getData = async () => {

        const response = await axios.get(URL)
        setCustomers(response.data)
    }

    const renderHeader = () => {
        let headerElement = ['id', 'name', 'gallons requested', 'delivery address', 'delivery date', 'suggested price', 'total cost']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    const renderBody = () => {
        return customers && customers.map(({ id, name, gallons, address, date, price, cost }) => {
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{gallons}</td>
                    <td>{address}</td>
                    <td>{date}</td>
                    <td>{price}</td>
                    <td>{cost}</td>
                </tr>
            )
        })
    }

    return (
        <>
            <h1 id='title'>Quote History</h1>
            <table id='customer'>
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </table>
        </>
    )
}


export default QuoteHHistory;