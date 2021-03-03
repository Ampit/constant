import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

export default function Main() {
  const [session, loading] = useSession();
  const router = useRouter();
  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return "Loading";
  // If no session exists, display access denied message
  if (session) {
    // Redirect to tasks page
    router.push("/tasks");
  }

  return <div className="text-center">Home Page</div>;
}
