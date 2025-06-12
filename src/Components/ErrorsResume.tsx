import ErrorCard from './ErrorCard';
import { useAccount, useBalance } from 'wagmi';
import { useMemo, useState } from 'react';
import { parseEther } from 'viem';

export type statusType = 'loading' | 'success' | 'error' | null;
export interface ErrorsResumeProps {
    price: string;
    id: number;
    //validatePurchaseRequirements: () => Promise<boolean>;
}

const ErrorsResume: React.FC<ErrorsResumeProps> = ({ price, id }) => {
    const { address, isConnected } = useAccount();
    const userBalance = useBalance({ address: address });
    const buyerBalance = userBalance.data?.value;
    const exercisePrice = useMemo(() => parseEther(price), [price]);

    const [isConnectedStatus, setIsConnectedStatus] = useState<statusType>(null);
    const [isAlreadyPurchasedStatus, setIsAlreadyPurchasedStatus] = useState<statusType>(null);
    const [userBalanceStatus, setUserBalanceStatus] = useState<statusType>(null);

    const checkConnectionStatus = (): statusType => {
        setIsConnectedStatus('loading');

        const status: statusType = !isConnected || !address ? 'error' : 'success';
        setIsConnectedStatus(status);

        return status;
    };

    const checkBuyerBalance = (): statusType => {
        setUserBalanceStatus('loading');

        const status: statusType = buyerBalance < exercisePrice ? 'error' : 'success';
        setUserBalanceStatus(status);

        return status;
    };

    // const checkAlreadyPurchased = (): statusType =>{
    //     setIsAlreadyPurchasedStatus("loading");

    //     const buyerPurchases[] =

    //     const status: statusType = id
    //     return status;
    // }

    function validatePurchaseRequirements() {
        const connectionStatusResult = checkConnectionStatus();
        const balanceBuyerStatusResult = checkBuyerBalance();
        //verifica se l'utente ha già acquistato l'esercizio
        // else if (se il corso è già stato acquistato) {
        //     alert('You have already purchased this exercise.');
        //     return;}
    }

    return (
        <div>
            <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2">
                <ErrorCard
                    status={isConnectedStatus}
                    alertMessage="No wallet connected. Please connect your wallet to proceed with the purchase"
                    confirmMessage="Wallet successfully connected. You can now proceed with the purchase"
                />
                <ErrorCard
                    status={isAlreadyPurchasedStatus}
                    alertMessage="You have already purchased this product"
                    confirmMessage="This product has not been purchased yet and is available for purchase"
                />
                <ErrorCard
                    status={userBalanceStatus}
                    alertMessage="Your balance is not sufficient to complete the purchase"
                    confirmMessage="Your balance is sufficient to complete the purchase"
                />
            </div>
        </div>
    );
};

export default ErrorsResume;
