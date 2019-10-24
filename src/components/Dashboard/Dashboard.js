import React, { Component } from 'react';
import Controls from '../Controls/Controls';
import Balance from '../Balance/Balance';
import TransactionHistory from '../TransactionHistory/TransactionHistory';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import styles from './Dashboard.module.css';
import uuidv1 from 'uuid/v1';

const date = () => {
  const year = Math.floor(Math.random() * (2019 - 2011) + 2011);
  const month = Math.floor(Math.random() * 12 + 1);
  const day = Math.floor(Math.random() * 30 + 1);
  const newDate = new Date(year, month, day).toLocaleString('en-US');
  return newDate;
};

export default class Dashboard extends Component {
  state = {
    transactions: [],
    balance: 0,
  };

  componentDidMount() {
    const t = localStorage.getItem('transactions');
    if (t) {
      this.setState({ transactions: JSON.parse(t) });
    }
    const b = localStorage.getItem('balance');
    if (b) {
      this.setState({ balance: JSON.parse(b) });
    }
  }

  componentDidUpdate(prevState) {
    const { transactions, balance } = this.state;

    if (transactions !== prevState.transactions) {
      localStorage.setItem(
        'transactions',
        JSON.stringify(transactions),
      )  
    }
    if (balance !== prevState.balance) {
      localStorage.setItem(
        'balance',
        JSON.stringify(balance),
      )
  }
}

  handleChangeDeposit = amount => {
  if (amount === null || amount <= 0) {
    // toast.info('Введите сумму для проведения операции!');
    return
  }
  this.setState(({ transactions, balance }) => {
    localStorage.setItem(transactions, balance);
    return {
      transactions: [...transactions, this.makeOperations(amount, 'deposit')],
      balance: balance + amount,
    };
    
  })
}

  handleChangeWithdrawl = amount => {
    if (amount <= 0) {
      // toast.error('Некорректно введена сумма! Невозможно провести операцию!');
      return;
    }
    if (amount > this.state.balance ) {
      // toast.warn('На счету недостаточно средств для проведения операции!');
      return;
    }  
  this.setState(({ transactions, balance }) => {
    return {
      transactions: [...transactions, this.makeOperations(amount, 'withdrawal')],
      balance: balance - amount,
    };
  });
}

    makeOperations(amount, type) {
      const newOperation = {
        type: type,
        id: uuidv1(),
        amount: amount,
        date: date(),
      };
      return newOperation;
    }

transactionsOperations(type) {
const { transactions } = this.state;
    return [...transactions].reduce((acc, item) => {
      if (item.type === type) {
        return acc + item.amount;
      }
      return acc;
    }, 0);
  }

  render() {
    const { transactions, balance } = this.state;

    return (
      <div className={styles.dashboard}>
        <Controls
          onDeposit={this.handleChangeDeposit}
          onWithdraw={this.handleChangeWithdrawl}
        />
          <Balance 
            balance={balance} 
            income={this.transactionsOperations('deposit')} 
            expenses={this.transactionsOperations('withdrawal')}
            />
              <TransactionHistory transactions={transactions} />
                {/* <ToastContainer /> */}
        </div>
    );
  }
  }

