import ErrorCard from './ErrorCard';
import { useAccount, useBalance } from 'wagmi';
import { useEffect, useState, useCallback } from 'react';
import { parseEther } from 'viem';
import { usePurchases } from '../Hooks/usePurchases';

export type statusType = 'loading' | 'success' | 'error' | null;
export interface ErrorsResumeProps {
    price: string;
    id: number;
}

const ErrorsResume: React.FC<ErrorsResumeProps> = ({ price, id }) => {
    const { address, isConnected } = useAccount();
    const { getPurchases } = usePurchases();
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

    const validate = useCallback(() => {
        setStatus({
            connection: 'loading',
            balance: 'loading',
            alreadyPurchased: 'loading',
        });

        const connectionStatus: statusType = isConnected && address ? 'success' : 'error';

        const balanceStatus: statusType = !isConnected
            ? null
            : balanceData?.value && balanceData.value >= parseEther(price)
            ? 'success'
            : 'error';

        const alreadyPurchasedStatus: statusType = !isConnected
            ? null
            : address
            ? !getPurchases(address).includes(id)
                ? 'success'
                : 'error'
            : 'error';

        setStatus({
            connection: connectionStatus,
            balance: balanceStatus,
            alreadyPurchased: alreadyPurchasedStatus,
        });
    }, [isConnected, address, balanceData, price, getPurchases, id]);

    useEffect(() => {
        validate();
    }, [validate]);

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
