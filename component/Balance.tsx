import React from "react";
import getUserBalance from "@/app/action/getUserBalance"; // Assuming you have a function to get user balance

export default async function Balance() {
  const { balance } = await getUserBalance();
  return (
    <div>
      <h4>Your Balance</h4>
      <h1>${balance}</h1>
    </div>
  );
}
