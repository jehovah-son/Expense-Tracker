'use server';

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
    //and do a little bit of error checking or validationand send back either the transaction data if everything is ok or an error message

    const textValue = formData.get("text");
    const amountValue = formData.get("amount");

    // validate the data
    if (!textValue || !amountValue || textValue === "") {
        return { error: "Invalid input" };
    }
    ////////////////////
    const text = textValue.toString();// ensures text is a string

    const amount = parseFloat(amountValue.toString());// ensures amount is a number

    // create the transaction object
    const transactionData: TransactionData = { text, amount };

    // here you would typically send this data to your server or database
    console.log("Transaction added:", transactionData);


    // as long no error we return the transaction data
    // return the transaction data
    return { data: transactionData };
}

//we want make sure we export this function down at the bottom
export default addTransaction;    