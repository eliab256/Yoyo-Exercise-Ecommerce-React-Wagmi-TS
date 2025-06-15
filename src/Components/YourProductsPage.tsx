import { useAccount } from 'wagmi';
import { usePurchases } from '../Hooks/usePurchases';
import {useState} from "react"
import exercisesCardData from '../Data/ExerciseCardData';
import ExerciseCard from './ExerciseCard';

const YourProductsPage: React.FC = () => {
    const { address, isConnected } = useAccount();
    const { getPurchases } = usePurchases();
    const [currentExerciseIdSelected, setCurrentExerciseIdSelected] = useState<number | null>(null);

    const userPurchases = address ? getPurchases(address) : [];
    const hasPurchased = userPurchases.length > 0;

    const purchasedExercises = exercisesCardData.filter(exercise => userPurchases.includes(exercise.id));

    function handleOpenDownloadPage = (id: number) => {
        setCurrentExerciseIdSelected(id);
    }

    return (
        <div>
            {/* wallet is connected and user has some product */}
            {isConnected && address && hasPurchased && (
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 
                            px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 pt-2
                            transition-opacity duration-300 "
                >
                    {purchasedExercises.map(exercise => (
                        <ExerciseCard
                            key={exercise.id}
                            exerciseProp={exercise}
                            alreadyPurchased={true}
                            handleClick={() => handleOpenDownloadPage()}
                        />
                    ))}
                </div>
            )}
            {/* wallet is connected but the user hasn't never bought a product */}
            {isConnected && address && !hasPurchased && <div>Haven't bought anything yet</div>}
            {/* wallet is not connected */}
            {!isConnected && (
                <div className="flex justify-center items-center h-64">
                    Please connect your wallet to view your products.
                </div>
            )}
        </div>
    );
};

export default YourProductsPage;
