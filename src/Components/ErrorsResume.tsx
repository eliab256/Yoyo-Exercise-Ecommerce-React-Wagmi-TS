import ErrorCard from './ErrorCard';
import { useAccount, useBalance } from 'wagmi';
import { useEffect, useState } from 'react';
import { usePurchases } from '../Hooks/usePurchases';
import { parseEther } from 'viem';

export type statusType = 'loading' | 'success' | 'error' | null;
export interface ErrorsResumeProps {
    price: number;
    id: number;
    onStatusChange: (statuses: { connection: statusType; balance: statusType; alreadyPurchased: statusType }) => void;
}

const ErrorsResume: React.FC<ErrorsResumeProps> = ({ price, id, onStatusChange }) => {
    const { address, isConnected } = useAccount();
    const { purchasesList } = usePurchases();
    const { data: balanceData, isLoading: isBalanceLoading } = useBalance({
        address,
        query: { enabled: !!address },
    });

    const [status, setStatus] = useState<{
        connection: statusType;
        balance: statusType;
        alreadyPurchased: statusType;
    }>({
        connection: 'loading',
        balance: 'loading',
        alreadyPurchased: 'loading',
    });

    useEffect(() => {
        // 1. Connection Status
        const connectionStatus: statusType = isConnected && address ? 'success' : 'error';

        // 2. Balance Status
        let balanceStatus: statusType;
        if (!isConnected || !address) {
            balanceStatus = null;
        } else if (isBalanceLoading || balanceData === undefined) {
            balanceStatus = 'loading';
        } else {
            const priceInWei = parseEther(price.toString());
            balanceStatus = balanceData.value >= priceInWei ? 'success' : 'error';
        }

        // 3. Already Purchased Status
        let alreadyPurchasedStatus: statusType;
        if (!isConnected || !address) {
            alreadyPurchasedStatus = null;
        } else {
            alreadyPurchasedStatus = !purchasesList.includes(id) ? 'success' : 'error';
        }

        const newStatus = {
            connection: connectionStatus,
            balance: balanceStatus,
            alreadyPurchased: alreadyPurchasedStatus,
        };

        setStatus(newStatus);
        onStatusChange(newStatus);
    }, [isConnected, address, balanceData, isBalanceLoading, price, purchasesList, id, onStatusChange]);

    return (
        <div className="mt-4 w-full flex flex-col flex-grow">
            <ErrorCard
                status={status.connection}
                alertMessage="No wallet connected. Please connect your wallet to proceed with the purchase"
                confirmMessage="Wallet successfully connected. You can now proceed with the purchase"
            />
            <ErrorCard
                status={status.alreadyPurchased}
                alertMessage="You have already purchased this product"
                confirmMessage="This product has not been purchased yet and is available for purchase"
            />
            <ErrorCard
                status={status.balance}
                alertMessage="Your balance is not sufficient to complete the purchase"
                confirmMessage="Your balance is sufficient to complete the purchase"
            />
        </div>
    );
};

export default ErrorsResume;
