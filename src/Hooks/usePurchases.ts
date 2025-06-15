import { useEffect, useState } from 'react';
import { type Address } from 'viem';

type PurchasesData = Record<Address, number[]>;

const STORAGE_KEY = 'web3_purchases';

export function usePurchases() {
    const [purchases, setPurchases] = useState<PurchasesData>({});

    useEffect(() => {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
            try {
                setPurchases(JSON.parse(savedData) as PurchasesData);
            } catch (e) {
                console.error('Error parsing purchases data', e);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(purchases));
    }, [purchases]);

    // Add new Purchase
    const addPurchase = (address: Address, productId: number) => {
        setPurchases(prev => ({
            ...prev,
            [address]: [...(prev[address] || []), productId],
        }));
    };

    // return function
    const getPurchases = (address: Address): number[] => {
        return purchases[address] || [];
    };

    return { purchases, addPurchase, getPurchases };
}
