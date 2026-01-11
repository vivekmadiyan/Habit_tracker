import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  // If user is logged in, go to dashboard
  if (session) {
    redirect("/dashboard");
  }

  // If not logged in, show landing page
  redirect("/landing");
}