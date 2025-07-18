import React from "react";
import getIncomeExpense from "@/app/action/getIcomeExpense";
import { addComas } from "@/lib/utils";

export default async function IncomeExpense() {
  const { income, expense } = await getIncomeExpense();
  return (
    <div className="inc-exp-container">
      <div>
        {/* income */}
        <h4>Income</h4>
        <p className="money plus">
          ${addComas(Number(income?.toFixed(2) ?? 0))}
        </p>
      </div>
      {/* expense */}
      <div>
        <h4>Expense</h4>
        <p className="money minus">
          ${addComas(Number(expense?.toFixed(2) ?? 0))}
        </p>
      </div>
    </div>
  );
}
