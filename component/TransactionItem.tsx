"use client";
import { Transaction } from "@/types/Transaction";
import { addComas } from "@/lib/utils";
import { toast } from "react-toastify";
import deleteTransaction from "@/app/action/deleteTransaction";

export default function TransactionItem({
  transaction,
}: {
  transaction: Transaction;
}) {
  //
  const handleDeleteTransaction = async (transactionId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?"
    );
    // if not confirmed
    if (!confirmed) return;
    // we await on the function DeleteTransaction from the server
    const { message, error } = await deleteTransaction(transactionId);

    if (error) {
      toast.error(error);
    }

    toast.success(message);
  };

  const sign = transaction.amount < 0 ? "-" : "+";
  return (
    <li className={transaction.amount > 0 ? "plus" : "minus"}>
      {transaction.text}
      <span>
        {sign}${addComas(Math.abs(transaction.amount))}
      </span>
      <button
        onClick={() => handleDeleteTransaction(transaction.id)}
        className="delete-btn"
      >
        X
      </button>
    </li>
  );
}
