'use client'
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {

  const [currentAccount, setCurrentAccount] = useState("");


  // Wallet connection logic
  const isWalletConnected = async () => {
    try {

      //@ts-expect-error - Property 'ethereum' does not exist on type 'Window & typeof globalThis'
      const { ethereum } = window;

      const accounts = await ethereum.request({ method: 'eth_accounts' })

      if (accounts.length > 0) {
        const account = accounts[0];
        console.log("wallet is connected! " + account);
      } else {
        console.log("make sure MetaMask is connected");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }

  const connectWallet = async () => {
    try {
      //@ts-expect-error - Property 'ethereum' does not exist on type 'Window & typeof globalThis'
      const { ethereum } = window;

      if (!ethereum) {
        console.log("please install MetaMask");
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {

    isWalletConnected();

  }, []);


  return (
    <div className="flex flex-col items-center">

      <main>
        <h1 className="text-large">Welcome to your local Web 3 Decentralized Library!</h1>

        {currentAccount ? (
          <div>
            <Link className="text-blue-300 underline underline-offset-1" href="/catalog">Browse our catalog</Link>
            <br></br>
            <Link className="text-blue-300 underline underline-offset-1" href="/add-book">Add a Book</Link>
          </div>
        ) : (
          <div>
            <h2 className="text-md">Connect your wallet to continue</h2>
            <button className="mt-8 bg-sky-500 p-5 hover:bg-sky-800 rounded-md" onClick={connectWallet}> Connect your wallet </button>
          </div>
        )}
      </main>

    </div>
  );
}
