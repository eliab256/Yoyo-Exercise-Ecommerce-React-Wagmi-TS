import { useAccount } from 'wagmi';
import { usePurchases } from '../Hooks/usePurchases';
import { useState, useEffect } from 'react';
import exercisesCardData from '../Data/ExerciseCardData';
import { type ExerciseCardData } from '../Data/ExerciseCardData';
import ExerciseCard from './ExerciseCard';
import LoadingSpinner from './LoadingSpinner';
import DownloadPage from './DownloadPdfPage';
import { useSelector } from 'react-redux';
import { type ExerciseId } from '../redux/selectedExerciseSlice';

const YourProductsPage: React.FC = () => {
    const { address, isConnected } = useAccount();
    const { purchasesList } = usePurchases();
    const [purchasedExercises, setPurchasedExercises] = useState<ExerciseCardData[]>([]);
    const [loading, setLoading] = useState(true);

    const currentExerciseIdSelected = useSelector(
        (state: { selectedExercise: { id: ExerciseId } }) => state.selectedExercise.id
    );
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

    return (
        <div>
            <div>
                {/* wallet is not connected */}
                {!isConnected && (
                    <div className="relative flex justify-center items-center min-h-[50vh] px-4 animate-pulse ">
                        <div className="border-red-500 border-2 bg-white  rounded-2xl shadow-lg p-6 w-full max-w-md text-center">
                            <h2 className="text-xl md:text-2xl font-semibold text-red-700 mb-2">
                                Wallet not connected
                            </h2>
                            <p className="text-red-600">Please connect your wallet to view your products.</p>
                        </div>
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
                            <ExerciseCard key={exercise.id} exerciseProp={exercise} />
                        ))}
                    </div>
                )}
                {/* wallet is connected but the user hasn't never bought a product */}
                {isConnected && address && !hasPurchased && !loading && (
                    <div className="relative flex justify-center items-center min-h-[50vh] px-4 animate-pulse ">
                        <div className="border-red-500 border-2 bg-white  rounded-2xl shadow-lg p-6 w-full max-w-md text-center">
                            <h2 className="text-xl md:text-2xl font-semibold text-red-700 mb-2">
                                Haven't bought any product yet
                            </h2>
                            <p className="text-red-600">Go to the gallery page and choose your training pack.</p>
                        </div>
                    </div>
                )}
            </div>
            {selectedExercise && (
                <>
                    <div className="fixed inset-0 z-50 flex justify-center items-center">
                        <DownloadPage selectedExerciseProp={selectedExercise} />
                    </div>
                </>
            )}
        </div>
    );
};

export default YourProductsPage;
