import Game from "@/components/Game";
import Header from "@/components/Hearder";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Verbum</title>
      </Head>
      <main>
        <Header />
        <Game />
      </main>
    </>
  );
}
