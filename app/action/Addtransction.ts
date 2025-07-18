'use server';
import { auth } from "@clerk/nextjs/server";
import { Db } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface TransactionData {
    text: string;
    amount: number;
}

//?? mean it could be an error  we make it optional
//so this function we are about to create is going to return either the data which will have the transaction data or an error message
// we return the error because we want to show it in the UI
interface TransactionResult {
    data?: TransactionData;
    error?: string;
}

// now we create the function

async function addTransaction(
    formData: FormData
): Promise<TransactionResult> {
    // we get the data from the form
    //and do a little bit of error checking or validation and send back either the transaction data if everything is ok or an error message

    const textValue = formData.get("text");
    const amountValue = formData.get("amount");

    // validate the data
    if (!textValue || textValue === "" || !amountValue) {
        return { error: "Invalid input" };
    }
    ////////////////////
    const text = textValue.toString();// ensures text is a string

    const amount = parseFloat(amountValue.toString());// ensures amount is a number

    //to add the user id from clerk with the transaction
    // we use the auth function from clerk to get the user id
    // this will give us the user id of the currently logged in user
    // [clerk Id]
    //get logged in user
    const { userId } = await auth();
    // check for user
    if (!userId) {
        return { error: "User not found" };
    }



    // to create and save the transaction to the database
    // we use the prisma client to create a new transaction in the database
    // we put it in a try catch block to handle any errors that might occur during the database operation
    try {
        const transactionData = await Db.userTransaction.create({
            data: {
                text,
                amount,
                userId, // associate the transaction with the logged-in user
            },
        });
        // revalidate the path
        revalidatePath("/");
        // here you would typically send this data to your server or database
        // return the transaction data
        return { data: transactionData };

    } catch (error) {
        console.error("Error adding transaction:", error);
        return { error: "Failed to add transaction" };
    }
}

//we want make sure we export this function down at the bottom
export default addTransaction;    