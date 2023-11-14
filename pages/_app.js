import Head from "next/head";
import "../styles/globals.css";
import { SocketProvider } from "../context/socketContext";
import { PlayerProvider } from "../context/playerContext";
function MyApp({ Component, pageProps }) {
  return (
    <PlayerProvider>
      <SocketProvider>
        <Head>
          <link rel="icon" href="/elements/pizza_new.png" />
          <title>Fun Pizza Game</title>
        </Head>
        <Component {...pageProps} />
      </SocketProvider>
    </PlayerProvider>
  );
}
export default MyApp;
