import React from 'react';

const Transaction = (props) => {
    return (
        <li><strong>Hash:</strong> {props.hash} <strong>Total:</strong> {props.total} <strong>Fee:</strong> {props.fee}</li>
    );
};

export default Transaction;