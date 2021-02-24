import { signOut } from "next-auth/client";

export default function LoggedIn({ session }) {
  return (
    <p className="text-center">
      Signed in as {session.user.email}
      <br />
      <button onClick={() => signOut()}>Sign out</button>
    </p>
  );
}
