import Head from "next/head";
import { NextRouter } from "next/router";
import React from 'react';

type MainProps = {
  children: React.ReactNode
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Search for words</title>
        <meta name="description" content="Get details about a given word like synomyms etc." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="backdrop-blur-2xl container w-full mx-auto flex flex-col items-center min-h-screen p-4">
        {children}
      </main>
    </>
  )
}

export default Main;
