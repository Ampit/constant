import { signIn } from "next-auth/client";

export default function AccessDenied() {
  return (
    <div className="text-center">
      Access Denied
      <br />
      You must
      <button
        className="btn btn-sm btn-primary m-2"
        onClick={(e) => {
          e.preventDefault();
          signIn();
        }}
      >
        Sign in
      </button>
      to view this page
    </div>
  );
}
