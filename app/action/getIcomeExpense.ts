"use server";
import { Db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

async function getIncomeExpense(): Promise<{
    income?: number;
    expense?: number;
    error?: string;
}>
// get the user id from the auth context
{
    const { userId } = await auth();
    // check for the user 
    if (!userId) {
        return { error: "User not found" };
    }

    // and if there is a user we open up a try catch
    // first get the transaction of the user
    try {
        const transactions = await Db.userTransaction.findMany({
            where: { userId },
        });

        //  get the amount
        // the transactions is an object that has text, amount,id,userid, we just want the amount
        const amount = transactions.map((transaction) => transaction.amount);

        //we get the income and expense by filtering the amount
        const income = amount.filter((amount) => amount > 0).reduce((acc, amount) => acc + amount, 0);
        const expense = amount.filter((amount) => amount < 0).reduce((acc, amount) => acc + amount, 0);

        return { income, expense: Math.abs(expense) };

    } catch (error) {
        console.log(error)
        return { error: "Database error" };
    }

}

export default getIncomeExpense;
