"use client";

export default function AddTransaction() {
  const clientAction = async (formData: FormData) => {
    console.log(formData.get("amount"), formData.get("text"));
  };

  return (
    <>
      <h3>Add Transaction</h3>
      <form action={clientAction}>
        <div className="form-control">
          <label htmlFor="text">Text:</label>
          <input
            type="text"
            id="text"
            name="text"
            required
            placeholder="text"
          />
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
            required
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
