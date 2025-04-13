import { useEffect } from "react";
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { base, baseSepolia, immutableZkEvm, immutableZkEvmTestnet, mainnet, sepolia } from "viem/chains";

export const getChain = (chainId: number) => {
  switch (chainId) {
    case 8453:
      return base;
    case 84532:
      return baseSepolia;
    default:
      throw new Error("Unsupported chainId");
  }
};

export const viewPublicClient = (chainId: number) => createPublicClient({
  chain: getChain(chainId),
  transport: getViewClientHttp(chainId)
});

export const getViewClientHttp = (chainId: number) => {
  if (isChainBase(chainId)) {
    return http(process.env.NEXT_PUBLIC_VIEW_HTTP_BASE)
  } else if ( isChainImmutable(chainId)) {
    return http(process.env.NEXT_PUBLIC_VIEW_HTTP_IMMUTABLE)
  }

  return http();
}