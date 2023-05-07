import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";


export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
    <Head>
      <title>
        Chamonix
      </title>
      <meta
        name="description"
        content="Code by Ornella Radica - software developer."
      />
      <meta
        property="og:image"
        content=
          '/images/logo-chamonix.png'
      />
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link 
        rel="preconnect" 
        href="https://fonts.gstatic.com" 
        //@ts-ignore
        crossorigin
      />
      <link href="https://fonts.googleapis.com/css2?family=Bangers&display=swap" rel="stylesheet"/>
      </Head>

      {router.route !== "/" ?  <Header /> : null}
      <main>
        <Component {...pageProps} />
      </main>
      {router.route !== "/" ?  <Footer /> : null}
    </>
  );
}
