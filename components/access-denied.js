import { signIn } from "next-auth/client";
import Button from "react-bootstrap/Button";

export default function AccessDenied() {
  return (
    <div className="text-center">
      Access Denied
      <br />
      You must
      <Button
        variant="primary"
        size="sm"
        className="m-2"
        onClick={(e) => {
          e.preventDefault();
          signIn();
        }}
      >
        Sign in
      </Button>
      to view this page
    </div>
  );
}
