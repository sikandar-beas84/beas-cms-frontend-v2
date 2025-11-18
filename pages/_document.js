import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Head>
        {/* Add global stylesheet link here if needed */}
        {/* <link rel="stylesheet" href="/assets/css/styles.css" /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
