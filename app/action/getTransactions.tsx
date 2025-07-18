"use server";
import { Db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Transaction } from "@/types/Transaction";

async function getTransactions(): Promise<{
  transactions?: Transaction[];
  error?: string;
}> {
  // get the user id from the auth context
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
      // we order it by date in descending
      orderBy: {
        createdAt: "desc",
      },
    });

    // return the balance

    return { transactions };
  } catch (error) {
    console.error("Error fetching user balance:", error);
    return { error: "Failed to fetch user balance" };
  }
}

export default getTransactions;
