import Guest from "@/component/Guest";
import { currentUser } from "@clerk/nextjs/server";
import AddTransaction from "@/component/AddTransaction";
export default async function HomePage() {
  // Check if the user is currently signed in
  const user = await currentUser();
  // If the user is not signed in, render the Guest component
  if (!user) {
    return <Guest />;
  }
  // If the user is signed in, render the main content

  return (
    <main>
      <h2>
        Welcome, {user.firstName} {user.lastName}
      </h2>

      <AddTransaction />
    </main>
  );
}
