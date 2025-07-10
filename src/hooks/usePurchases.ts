import { useEffect, useCallback, useMemo } from 'react';
import { contractAbi, chainsToContractAddress } from '../data/SmartContractData';
import { useReadContract, useWriteContract, useChainId, useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';

export function usePurchases() {
    const { address } = useAccount();
    const chainId = useChainId();
    const contractAddress = chainsToContractAddress[chainId].contractAddress;

    const { data: purchasesListBigInt, refetch } = useReadContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'getYourIds',
        account: address,
        query: {
            enabled: !!contractAddress && !!address,
        },
    }) as { data: bigint[] | undefined; refetch: () => void };

    const { writeContract, isPending, isSuccess, error, data: hash } = useWriteContract();

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });

    // get the purchases from Smart Contract
    useEffect(() => {
        if (isConfirmed) {
            refetch();
        }
    }, [isConfirmed, refetch]);

    useEffect(() => {
        if (contractAddress && address) {
            refetch();
        }
    }, [contractAddress, address]);

    const purchasesList = useMemo(() => {
        return purchasesListBigInt?.map(id => Number(id)) ?? [];
    }, [purchasesListBigInt]);

    // Add new Purchase
    const addPurchase = useCallback(
        async (productId: number, price: number) => {
            try {
                await writeContract({
                    address: contractAddress,
                    abi: contractAbi,
                    functionName: 'buyExercise',
                    args: [parseEther(price.toString()), BigInt(productId)],
                    value: parseEther(price.toString()),
                });
            } catch (err) {
                console.error('Error adding purchase:', err);
                throw err;
            }
        },
        [writeContract, contractAddress]
    );

    return { purchasesList, addPurchase, isPending, isSuccess, isConfirming, isConfirmed, error };
}
