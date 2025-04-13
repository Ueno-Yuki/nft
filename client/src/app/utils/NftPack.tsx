import { viewPublicClient } from "./viewPublicClient"

export const useBalanceOf = async(
  accountAddress: `0x${string}`,
  contractAddress: `0x${string}`,
  tokenId: number,
  chainId: number,
) => {
  try {
    const client = viewPublicClient(chainId);
    const data = await client.readContract({
      address: contractAddress,
      abi: MYNFT,
      functionName: 'balanceOf',
      args: [accountAddress, BigInt(tokenId)]
    });
    console.log('data: ', data);
    return {
      balance: Number(data),
    };
  } catch (err) {
    console.log(err);
    throw new Error('Failed to read contract');
  }
}