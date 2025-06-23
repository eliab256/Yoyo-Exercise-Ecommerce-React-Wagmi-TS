import { useEffect, useCallback, useMemo } from 'react';
import { contractAbi, chainsToContractAddress } from '../Data/SmartContractData';
import { useReadContract, useWriteContract, useChainId, useAccount } from 'wagmi';

export function usePurchases() {
    const { address } = useAccount();
    const chainId = useChainId();
    const contractAddress = chainsToContractAddress[chainId].contractAddress;
    const { data: purchasesListBigInt, refetch } = useReadContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'getYourIds',
    }) as { data: bigint[] | undefined; refetch: () => void };
    const { writeContract, isPending, isSuccess, error } = useWriteContract();

    // get the purchases from Smart Contract
    useEffect(() => {
        if (contractAddress) {
            refetch();
        }
    }, [contractAddress, address, refetch]);

    const purchasesList = useMemo(() => {
        return purchasesListBigInt?.map(id => Number(id)) ?? [];
    }, [purchasesListBigInt]);

    // Add new Purchase
    const addPurchase = useCallback(
        async (productId: number) => {
            try {
                await writeContract({
                    address: contractAddress,
                    abi: contractAbi,
                    functionName: 'buyExercise',
                    args: [BigInt(productId)],
                });
                await refetch();
            } catch (err) {
                console.error('Error adding purchase:', err);
            }
        },
        [writeContract, contractAddress, refetch]
    );

    return { purchasesList, addPurchase, isPending, isSuccess, error };
}
