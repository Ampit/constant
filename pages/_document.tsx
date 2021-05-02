import Document, { Html, Head, Main, NextScript } from "next/document";
import { NextPageContext } from "next";

class MyDocument extends Document {
  static async getInitialProps(ctx: NextPageContext) {
    const initialProps = await Document.getInitialProps(ctx as any);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
          <div id="snackbar"></div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
