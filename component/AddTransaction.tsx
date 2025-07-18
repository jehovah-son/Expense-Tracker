"use client";
import addTransaction from "@/app/action/Addtransction";
import { toast } from "react-toastify";
import { useRef } from "react";

export default function AddTransaction() {
  // we create a ref to the form so that we can reset it after successful submission
  // this is useful to clear the form fields after adding a transaction
  const formRef = useRef<HTMLFormElement>(null);

  //what happened is the form submitted and went to this client action but then from there we call addTransaction function
  //pass in the form data and then we get back either the data or an error message
  const clientAction = async (formData: FormData) => {
    const { data, error } = await addTransaction(formData);
    if (error) {
      toast.error(error);
      console.log(error);
    } else {
      toast.success("Transaction added successfully!");
      // Optionally, you can reset the form after successful submission
      formRef.current?.reset();
      console.log("Transaction added:", data);
    }
  };

  return (
    <>
      <h3>Add Transaction</h3>
      <form ref={formRef} action={clientAction}>
        <div className="form-control">
          <label htmlFor="text">Text:</label>
          <input type="text" id="text" name="text" placeholder="text" />
        </div>
        {/* Amount */}
        <div className="form-control">
          <label htmlFor="amount">
            Amount: <br /> (negative - expenses, positive + income)
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="Enter amount..."
            step="0.01"
          />
        </div>

        <button type="submit" className="btn">
          Add Transaction
        </button>
      </form>
    </>
  );
}

// now our form we are going to be using server action however i dont want it to go directly to the server action
// because i want to do some client side validation before it goes to the server action
