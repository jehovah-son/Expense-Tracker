"use server";
import { Db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

async function deleteTransaction(transactionId: string): Promise<{
    message?: string;
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
    // 
    try {
        await Db.userTransaction.delete({
            where: {
                id: transactionId,
                userId,
            },
        });

        revalidatePath('/')

        return { message: "Transaction deleted successfully" };
    } catch (error) {
        console.error(error);
        return { error: "Database error while deleting transaction" };
    }

}

export default deleteTransaction;