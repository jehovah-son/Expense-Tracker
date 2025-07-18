import { Transaction } from "@/types/Transaction";
import getTransactions from "@/app/action/getTransactions";
import TransactionItem from "./TransactionItem";

export default async function TransactionList() {
  const { transactions, error } = await getTransactions();

  // if there an error
  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <h3>History</h3>
      <ul className="list">
        {transactions &&
          transactions.map((transaction: Transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
      </ul>
    </div>
  );
}
