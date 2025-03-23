'use client';
import { ethers } from 'ethers';
import { createContext, useEffect, useState } from 'react';
import { contractABI, contractAddress } from '../utils/connect';

export const TransactionContext = createContext({});

declare global {
  interface Window {
    ethereum: any;
  }
}

/** 
 * スマートコントラクトを取得する
 */
const getSmartContract = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum as ethers.Eip1193Provider);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(contractAddress, contractABI, await signer);

  console.log(provider, signer, transactionContract);
}

/** 
 * メタマスクウォレットと連携する
 */
export const connectWallet = async() => {
  if (!window.ethereum) return alert("メタマスクをインストールしてください");

  // メタマスクを持って入れば接続を開始する
  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts'});
    console.log(accounts[0]);
    console.log(accounts);
  } catch (err: unknown) {
    console.log(err);
    return '';
  }
}

export const TransactionProvier = ({children}: any) => {
  /**
   * メタマスクと連携済みかチェックする
   */ 
  const checkMetaMaskWalletConnected = async() => {
    if ( !window.ethereum ) return alert('先にメタマスクをインストールしてください！');

    // メタマスクのアカウントIDを取得する
    const accounts = await window.ethereum.request({method: 'eth_accounts'});
    console.log(accounts);
  }


  // TODO NFTを発行する
  const MintNft = async() => {

  }

  useEffect(() => {
    checkMetaMaskWalletConnected();
    if ( typeof window !== 'undefined' ) {
      const { innerHeight: height, innerWidth: width } = window;
    }
  }, []);

  return <TransactionContext.Provider value={{connectWallet, MintNft}}>{children}</TransactionContext.Provider>;
}