import { useSession, getSession } from "next-auth/client";

export default function LoggedIn() {
  const [session, loading] = useSession();

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return "Loading";

  return (
    <section className="text-center">
      <h4>Profile Page</h4>
      <p>Signed in as {session.user.email}</p>
      <hr />
    </section>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}
