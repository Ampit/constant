import { useSession } from "next-auth/client";

export default function LoggedIn() {
  const [session] = useSession();
  return (
    <>
      <p className="text-center">Signed in as {session.user.email}</p>
      <hr />
    </>
  );
}
