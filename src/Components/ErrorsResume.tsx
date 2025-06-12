import ErrorCard from './ErrorCard';
import { useAccount, useBalance } from 'wagmi';
import { useMemo } from 'react';
import { parseEther } from 'viem';

export type statusType = 'loading' | 'success' | 'error' | null;
export interface ErrorsResumeProps {
    price: string;
    validatePurchaseRequirements: () => Promise<boolean>;
}

const ErrorsResume: React.FC<ErrorsResumeProps> = ({ price }) => {
    const { address, isConnected } = useAccount();
    const userBalance = useBalance({ address: address });
    const buyerBalance = userBalance.data?.value;
    const exercisePrice = useMemo(() => parseEther(price), [price]);

    function validatePurchaseRequirements() {
        if (!isConnected) {
            alert('Please connect your wallet to purchase this exercise.');
            return;
        }
        //verifica se l'utente ha già acquistato l'esercizio
        // else if (se il corso è già stato acquistato) {
        //     alert('You have already purchased this exercise.');
        //     return;}
        else if (userBalance.isLoading) {
            alert('Balance is loading. Please wait.');
            return;
        }
        // verifica se ha abbastanza ETH per acquistare l'esercizio
        else if (!buyerBalance) {
            alert('Balance not available.');
            return;
        } else if (buyerBalance < exercisePrice) {
            alert('Insufficient balance.');
            return;
        }
    }

    return (
        <div>
            <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2">
                <ErrorCard />
                <ErrorCard />
                <ErrorCard />
            </div>
        </div>
    );
};

export default ErrorsResume;
