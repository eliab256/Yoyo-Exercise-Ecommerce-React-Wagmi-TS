import { useEffect, useState } from 'react';
import { useAccount, usePublicClient } from 'wagmi';
import { type Address, parseEventLogs } from 'viem';
import { contractAbi } from '../Data/SmartContractData';

interface UseUserPurchasedIdsResult {
    purchasedIds: number[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export function useUserPurchasedIds(contractAddress: Address): UseUserPurchasedIdsResult {
    const { address: userAddress } = useAccount();
    const publicClient = usePublicClient();

    const [purchasedIds, setPurchasedIds] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPurchasedIds = async () => {
        if (!userAddress || !publicClient) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const rawLogs = await publicClient.getLogs({
                address: contractAddress,
                fromBlock: 'earliest',
                toBlock: 'latest',
                args: {
                    buyer: userAddress,
                },
            });

            const parsedLogs = parseEventLogs({
                abi: contractAbi,
                eventName: 'PurchaseCompleted',
                logs: rawLogs,
            });

            // Estrai solo gli IDs e rimuovi duplicati
            const ids = [...new Set(parsedLogs.map(log => Number(log.args.productId)).filter(id => !isNaN(id)))];

            setPurchasedIds(ids);
        } catch (err) {
            console.error('Error fetching purchased IDs:', err);
            setError(err instanceof Error ? err.message : 'Unknown error occurred');
            setPurchasedIds([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPurchasedIds();
    }, [userAddress, publicClient, contractAddress]);

    const refetch = () => {
        fetchPurchasedIds();
    };

    return {
        purchasedIds,
        loading,
        error,
        refetch,
    };
}
