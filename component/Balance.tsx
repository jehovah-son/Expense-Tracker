import React from "react";
import getUserBalance from "@/app/action/getUserBalance"; // Assuming you have a function to get user balance
import { addComas } from "@/lib/utils";

export default async function Balance() {
  const { balance } = await getUserBalance();
  return (
    <div>
      <h4>Your Balance</h4>
      {/* Display the balance, if it's undefined or null, we set it to 0 */}
      {/* Using optional chaining to safely access balance */}
      {/* If balance is undefined or null, we set it to 0 */}
      <h1>${addComas(Number(balance?.toFixed(2) ?? 0))}</h1>
    </div>
  );
}
