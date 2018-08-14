import React from 'react';

const Transaction = (props) => {
    return (    
        <li><strong>Hash:</strong> {props.hash} 
            <p><strong>Total:</strong> {props.total} </p>
            <p><strong>Fee:</strong> {props.fee}</p>
            <hr />
        </li>
    );
};

export default Transaction;