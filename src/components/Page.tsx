import Head from "next/head";
import Title from "./Title";
import { PropsWithChildren } from "react";
import NavBar from "./NavBar";

interface PageProps {
  title: string;
}

function Page({ title, children }: PropsWithChildren<PageProps>) {
  return (
    <>
      <Head>
        <title>{title} - Next-Shop</title>
      </Head>
      <header>
        <NavBar/>
      </header>
      <main className="px-6 py-4">
        <Title>{title}</Title>
        {children}
      </main>
    </>
  );
}

export default Page;
