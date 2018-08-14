import React from 'react';
import Transaction from './Transaction';

const TransactionList = (props) => {
    console.log(`txs props: ${props}`);
    const transItems = props.trans.map((item, idx) => {
        return <Transaction hash={item.hash} total={item.result} fee={item.fee} key={idx} />;
    });

    return (
        <ul>{transItems}</ul>
    );
};

export default TransactionList;