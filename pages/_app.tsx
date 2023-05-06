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
      <meta
        name="description"
        content="Proyecto Ornella Radica"
      />
      <title>
        Proyecto Ornella Radica
      </title>
      <meta
        property="og:image"
        content=
          '/images/logo.png'
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
