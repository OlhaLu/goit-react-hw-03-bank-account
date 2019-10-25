import React from 'react';
import PropTypes from 'prop-types';
import styles from './Balance.module.css';

const Balance = ({balance, income, expenses}) => {
  return (
    <section className={styles.sections}>
        <span className={styles.income}>⬆{income}$</span>
        <span className={styles.expenses}>⬇{expenses}$</span>
      <span className={styles.balance}>Balance: {balance}$</span>
    </section>
  );
};

Balance.propTypes = {
  income: PropTypes.number.isRequired,
  expenses: PropTypes.number.isRequired,
  balance: PropTypes.number.isRequired,
};

export default Balance;
