//import Link from "next/link";
import { signOut, signIn } from "next-auth/client";
import { useSession } from "next-auth/client";

const Nav = () => {
  const [session] = useSession();
  return (
    <ul className="mt-3 nav justify-content-center">
      <li className="nav-item">
        <a className="nav-link active" href="/">
          Home
        </a>
      </li>
      {session && (
        <li className="nav-item pull-right">
          <button className="btn btn-danger" onClick={() => signOut()}>
            Sign out
          </button>
        </li>
      )}
      {!session && (
        <li className="nav-item pull-right">
          <button className="btn btn-primary" onClick={() => signIn()}>
            Sign In
          </button>
        </li>
      )}
    </ul>
  );
};

export default Nav;
