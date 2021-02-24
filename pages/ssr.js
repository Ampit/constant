import { getSession } from "next-auth/client";
import AccessDenied from "../components/access-denied";

export default function Page({ content, session }) {
  // If no session exists, display access denied message
  if (!session) {
    return <AccessDenied />;
  }

  // If session exists, display content
  return (
    <>
      <h3>Protected Page</h3>
      <p>
        <strong>{content}</strong>
      </p>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  let content = null;

  if (session) {
    const hostname = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const options = { headers: { cookie: context.req.headers.cookie } };
    const res = await fetch(`${hostname}/api/examples/protected`, options);
    const json = await res.json();
    if (json.content) {
      content = json.content;
    }
  }

  return {
    props: {
      session,
      content,
    },
  };
}
