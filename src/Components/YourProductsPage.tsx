import { useAccount } from 'wagmi';
import ShowYourProducts from './ShowYourProducts';

const YourProductsPage: React.FC = () => {
    const { address, isConnected } = useAccount();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 pt-2">
            {isConnected && address ? (
                <div>
                    <ShowYourProducts address={address} />
                </div>
            ) : (
                <div className="flex justify-center items-center h-64">
                    Please connect your wallet to view your products.
                </div>
            )}
        </div>
    );
};

export default YourProductsPage;
