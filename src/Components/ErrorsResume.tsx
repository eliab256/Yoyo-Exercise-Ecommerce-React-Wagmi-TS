import ErrorCard from './ErrorCard';
import { useAccount, useBalance } from 'wagmi';
import { useEffect, useState } from 'react';
import { usePurchases } from '../Hooks/usePurchases';

export type statusType = 'loading' | 'success' | 'error' | null;
export interface ErrorsResumeProps {
    price: number;
    id: number;
    onStatusChange: (statuses: { connection: statusType; balance: statusType; alreadyPurchased: statusType }) => void;
}

const ErrorsResume: React.FC<ErrorsResumeProps> = ({ price, id, onStatusChange }) => {
    const { address, isConnected } = useAccount();
    const { purchasesList } = usePurchases();
    const { data: balanceData } = useBalance({ address });

    const [status, setStatus] = useState<{
        connection: statusType;
        balance: statusType;
        alreadyPurchased: statusType;
    }>({
        connection: null,
        balance: null,
        alreadyPurchased: null,
    });

    useEffect(() => {
        const connectionStatus: statusType = isConnected && address ? 'success' : 'error';

        const balanceStatus: statusType = !isConnected
            ? null
            : balanceData?.value && balanceData.value >= price * 1e18
            ? 'success'
            : 'error';

        const alreadyPurchasedStatus: statusType = !isConnected
            ? null
            : address
            ? !purchasesList.includes(id)
                ? 'success'
                : 'error'
            : 'error';

        const newStatus = {
            connection: connectionStatus,
            balance: balanceStatus,
            alreadyPurchased: alreadyPurchasedStatus,
        };

        setStatus(newStatus);
        onStatusChange(newStatus);
    }, [isConnected, address, balanceData?.value, price, purchasesList, id, onStatusChange]);

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
