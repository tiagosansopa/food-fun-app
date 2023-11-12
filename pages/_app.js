import Head from "next/head";
import "../styles/globals.css";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/elements/pizza_new.png" />
        <title>Fun Pizza Game</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
