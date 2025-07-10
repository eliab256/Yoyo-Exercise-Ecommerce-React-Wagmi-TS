import ErrorCard from './ErrorCard';
import { useAccount, useBalance } from 'wagmi';
import { useEffect } from 'react';
import { usePurchases } from '../hooks/usePurchases';
import { parseEther } from 'viem';
import { type statusType } from '../redux/errorsStatusSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setAlreadyPurchasedStatus, setBalanceStatus, setConnectionStatus } from '../redux/errorsStatusSlice';

export interface ErrorsResumeProps {
    price: number;
    id: number;
}

const ErrorsResume: React.FC<ErrorsResumeProps> = ({ price, id }) => {
    const dispatch = useDispatch();
    const status = useSelector(
        (state: { errorsStatus: { connection: statusType; balance: statusType; alreadyPurchased: statusType } }) =>
            state.errorsStatus
    );
    const { address, isConnected } = useAccount();
    const { purchasesList } = usePurchases();
    const { data: balanceData, isLoading: isBalanceLoading } = useBalance({
        address,
        query: { enabled: !!address },
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

        dispatch(setConnectionStatus(connectionStatus));
        dispatch(setBalanceStatus(balanceStatus));
        dispatch(setAlreadyPurchasedStatus(alreadyPurchasedStatus));
    }, [isConnected, address, balanceData, isBalanceLoading, price, purchasesList, id, dispatch]);

    return (
        <div className="mt-4 w-full flex flex-col flex-grow ">
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
