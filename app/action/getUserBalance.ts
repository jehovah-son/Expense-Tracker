"use server";
import { Db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

async function getUserBalance(): Promise<{
    balance?: number;
    error?: string
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

        // in other to get the balance we need to sum up all the transactions

        const balance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
        // return the balance

        return { balance };
    } catch (error) {
        console.error("Error fetching user balance:", error);
        return { error: "Failed to fetch user balance" };
    }

}

export default getUserBalance;
