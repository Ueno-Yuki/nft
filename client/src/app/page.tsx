"use client";
import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Header from './components/Header';
import Footer from './components/Footer';

const View: NextPage = () => {

  const [mintNum, setMintNum] = useState(0);
  const [mintQuantity, setmintQuantity] = useState(1);
  const [disabledFlag, setDisabledFlag] = useState(false);
  const abi = [
    'function totalSupply() public view virtual override returns (uint256)',
    "function mint(uint _mintAmount) public payable",
  ]
  const contractAddress = "0x5337d19e8335Ec3034365c30729A0902156dBc3D"
  useEffect(() => {
    const setSaleInfo = async() =>{
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      try{
        const mintNumber = (await contract.totalSupply()).toString();
        console.log('mintNumber = ' + mintNumber);
        setMintNum(mintNumber);
      }catch(e){
        console.log(e);
      }
    };
    setSaleInfo();
  });

  // ミントボタン用
  function MintButton() {
    async function addChain() {
      try{
        await (window as any).ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x5' }],
        });
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = await provider.getSigner();
        setDisabledFlag(true);
      } catch(e) {
        console.log(e);
      }
      try{
        await (window as any).ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: 84532,
            chainName: 'basesepolia',
            nativeCurrency: {
              name: 'ETH',
              symbol: 'ETH',
              decimals: 5,
            },
            rpcUrls: ['https://api-sepolia.basescan.org/api'],
          }],
        });
        console.log('try');
        setDisabledFlag(true);
      }catch(Exeption){
        console.log('Ethereum already Connected');
        console.log('catch');
      }finally{
        console.log('finally');
      }
    }
    const mintQuantityPlus = async () =>{
      if(mintQuantity == 3){
        return;
      } else {
        setmintQuantity(mintQuantity + 1);
      }
    };

    const mintQuantityMinus = async () =>{
      if(mintQuantity == 1){
        return;
      } else {
        setmintQuantity(mintQuantity - 1);
      }
    };
    
    const nftMint = async() => {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = provider.getSigner();
      await provider.send('eth_requestAccounts', []);
      const tokenPrice = '0.01';
      const quantity = String(mintQuantity);
      const contract = new ethers.Contract(contractAddress, abi, await signer);
      try{
        await contract.mint(quantity, {value: ethers.parseEther(tokenPrice), gasLimit: 1000});
        alert('Starting to execute a transaction');
      }catch(err: any) {
      // JSONへ変換
        const jsonData = JSON.stringify(err.reason);
        alert(jsonData);
      }
    };
    return <>
    <div className="bg-black pb-16 flex flex-wrap buttom justify-center">
      <div className="m-12 lg:m-32 px-12 py-6 lg:pt-8 lg:px-20 border-2 bg-black text-center border-[#FFFFFF] bg-center bg-contain bg-no-repeat">
        <h1 className="text-2xl lg:text-4xl pt-2 lg:pt-4 lg:pb-6 text-white font-['Impact']">ETH MASKS NFT</h1>
        <h1 className="text-2xl lg:text-4xl pt-2 lg:pt-4 lg:pb-6 text-white font-['Impact']"> {mintNum} / 5000</h1>
        <a className="text-2xl lg:text-4xl pt-2 lg:pt-8 lg:pb-8 text-white font-['Impact']">3</a><a className="text-2xl lg:text-3xl pt-2 lg:pt-8 lg:pb-8 text-[#99CDDB] font-['Impact'] ">MAX</a><br/>
        
        <div className="pt-2 lg:pt-6 pb-7">
          <button type="button" className="text-2xl lg:text-3xl inline-flex flex-shrink-0 justify-center items-center gap-2 h-[1.375rem] w-[1.375rem] lg:h-[2.375rem] lg:w-[2.375rem]
          border-[#FFFFFF] border-transparent font-['Impact'] bg-[#99CDDB] text-[#FFFFFF] hover:text-[#99CDDB] hover:bg-[#FFFFFF] focus:outline-none focus:ring-2
          focus:ring-[#99CDDB] focus:ring-offset-2 transition-all  rounded-full dark:focus:ring-offset-gray-800" onClick={mintQuantityMinus}>
          -</button>
          <a className="text-2xl lg:text-3xl px-8 lg:pt-6 lg:pb-6 text-white font-['Impact']">{mintQuantity}</a>
          <button type="button" className="text-2xl lg:text-3xl inline-flex flex-shrink-0 justify-center items-center gap-2 h-[1.375rem] w-[1.375rem] lg:h-[2.375rem] lg:w-[2.375rem]
          border-[#FFFFFF] border-transparent rounded-full font-['Impact'] bg-[#99CDDB] text-[#FFFFFF] hover:text-[#99CDDB] hover:bg-[#FFFFFF] 
          focus:outline-none focus:ring-2 focus:ring-[#99CDDB] focus:ring-offset-2 transition-all dark:focus:ring-offset-gray-800" onClick={mintQuantityPlus}>
          +</button><br/>
        </div>
        { (!disabledFlag) && <button type="button" className="text-xl lg:text-2xl py-1 lg:py-3 px-12 lg:px-24 inline-flex justify-center items-center gap-2 rounded-full border border-transparent
        bg-[#FFFFFF] border-yellow-200 font-['Impact'] text-[#99CDDB] hover:yellow-500 hover:bg-[#99CDDB] hover:text-[#FFFFFF] hover:border-[#FFFFFF]
          focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:ring-offset-2 transition-all dark:focus:ring-offset-gray-800" onClick={() => addChain()}>
        CONNECT WALLET</button>}
        { (disabledFlag) && <button type="button" className="text-xl lg:text-2xl py-1 lg:py-3 px-12 lg:px-24 inline-flex justify-center items-center gap-2 rounded-full border border-transparent
        bg-[#FFFFFF] border-yellow-200 font-['Impact'] text-[#99CDDB] hover:yellow-500 hover:bg-[#99CDDB] hover:text-[#FFFFFF] hover:border-[#FFFFFF]
          focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:ring-offset-2 transition-all dark:focus:ring-offset-gray-800" onClick={() => nftMint()}>
        MINT NOW</button>}
      </div>
    </div>
    </>
  }

  return (
    <div>
      <Header />
      <MintButton/>
      <Footer />
    </div>
    
  );
};

export default View;