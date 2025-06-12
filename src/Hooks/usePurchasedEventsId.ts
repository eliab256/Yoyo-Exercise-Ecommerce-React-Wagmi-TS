import { useEffect, useState } from "react";
import { useAccount, usePublicClient } from "wagmi";
import { parseAbi, decodeEventLog, type Log, type Address } from "viem";
import { TokenSenderAbi} from "";

const abi = parseAbi([
  ""
]);

export function usePurchasedEventsId(contractAddress: Address) {
  const { address: userAddress } = useAccount();
  const publicClient = usePublicClient();
  const [ids, setIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userAddress || !publicClient) return;

    const fetchEvents = async () => {
      setLoading(true);
       try {
        const latestBlock = await publicClient.getBlockNumber();

        const logs = await publicClient.getLogs({
          address: contractAddress,
          fromBlock: latestBlock,
          toBlock: latestBlock,
          event: {
            signature: 'PurchaseCompleted(address,uint256,uint256)',
            args: {
              buyer: userAddress,
            },
          },
        });
    }
}