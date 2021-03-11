import { useSession, getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Main() {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    // if (session && !loading) {
    //   // Redirect to tasks page
    //   router.push("/tasks");
    // }
  }, []);

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return "Loading";

  return <div className="text-center">Home Page</div>;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}
