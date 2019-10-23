import React from 'react';
import PropTypes from 'prop-types';
import styles from './TransactionsHistory.module.css';

const TransactionsHistory = ({ transactions }) => {
  return (
    <table className={styles.table}>
      <thead className={styles.head}>
        <tr className={styles.title}>
          <th>Transaction</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody className={styles.transactions_body}>
      {transactions
            .map(item => (
              <tr key={item.id}>
                <td>{item.type}</td>
                <td>{item.amount}$</td>
                <td>{item.date}</td>
              </tr>
            ))
          }
      </tbody>
    </table>
  );
};

TransactionsHistory.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    date: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};

export default TransactionsHistory;
