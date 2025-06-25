import { useAccount } from 'wagmi';
import { usePurchases } from '../Hooks/usePurchases';
import { useState, useEffect } from 'react';
import exercisesCardData from '../Data/ExerciseCardData';
import { type ExerciseCardData } from '../Data/ExerciseCardData';
import ExerciseCard from './ExerciseCard';
import LoadingSpinner from './LoadingSpinner';
import DownloadPage from './DownloadPdfPage';

const YourProductsPage: React.FC = () => {
    const { address, isConnected } = useAccount();
    const { purchasesList } = usePurchases();
    const [purchasedExercises, setPurchasedExercises] = useState<ExerciseCardData[]>([]);
    const [currentExerciseIdSelected, setCurrentExerciseIdSelected] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    const selectedExercise = exercisesCardData.find(ex => ex.id === currentExerciseIdSelected);

    useEffect(() => {
        if (!address) {
            setPurchasedExercises([]);
            setLoading(false);
            return;
        }

        try {
            const purchasedExercisesList = exercisesCardData.filter(exercise => purchasesList.includes(exercise.id));
            setPurchasedExercises(purchasedExercisesList);
        } catch (error) {
            console.error('Error loading purchases', error);
        } finally {
            setLoading(false);
        }
    }, [address, purchasesList]);

    const hasPurchased = purchasedExercises.length > 0;

    const handleOpenDownloadPage = (id: number) => {
        setCurrentExerciseIdSelected(id);
    };

    const handleCloseDownloadPage = () => {
        setCurrentExerciseIdSelected(null);
    };

    return (
        <div>
            <div>
                {/* wallet is not connected */}
                {!isConnected && (
                    <div className="flex justify-center items-center h-64">
                        Please connect your wallet to view your products.
                    </div>
                )}
                {/* wallet is connected and website is loading*/}
                {isConnected && loading && (
                    <div>
                        <LoadingSpinner></LoadingSpinner>
                    </div>
                )}
                {/* wallet is connected and user has some product */}
                {isConnected && address && hasPurchased && !loading && (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 
                            px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 pt-2
                            transition-opacity duration-300 "
                    >
                        {purchasedExercises.map(exercise => (
                            <ExerciseCard
                                key={exercise.id}
                                exerciseProp={exercise}
                                handleClick={() => handleOpenDownloadPage(exercise.id)}
                            />
                        ))}
                    </div>
                )}
                {/* wallet is connected but the user hasn't never bought a product */}
                {isConnected && address && !hasPurchased && !loading && <div>Haven't bought anything yet</div>}
            </div>
            {selectedExercise && (
                <>
                    <div className="fixed inset-0 z-50 flex justify-center items-center">
                        <DownloadPage
                            onClose={handleCloseDownloadPage}
                            selectedExerciseProp={selectedExercise}
                            transactionTx={1}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default YourProductsPage;
