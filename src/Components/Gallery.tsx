import ExerciseCard from './ExerciseCard';
import PurchaseSummary from './PurchaseSummary';
import exercisesCardData from '../Data/ExerciseCardData';
import { useState } from 'react';
//import { useAccount } from 'wagmi';
import { usePurchases } from '../Hooks/usePurchases';

const Gallery: React.FC = () => {
    const [currentExerciseIdSelected, setCurrentExerciseIdSelected] = useState<number | null>(null);
    const selectedExercise = exercisesCardData.find(ex => ex.id === currentExerciseIdSelected);

    //const { address, isConnected } = useAccount();
    const { purchasesList } = usePurchases();

    const checkPurchase = (id: number): boolean => {
        return purchasesList.includes(id);
    };

    const handleOpenSummary = (id: number) => {
        setCurrentExerciseIdSelected(id);
        console.log(purchasesList);
    };

    const handleCloseSummary = () => {
        setCurrentExerciseIdSelected(null);
    };

    return (
        <div className="relative">
            <div
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 
                            px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 pt-4
                            transition-opacity duration-300
                            ${currentExerciseIdSelected !== null ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
            >
                {exercisesCardData.map(exercise => (
                    <ExerciseCard
                        key={exercise.id}
                        exerciseProp={exercise}
                        handleClick={() => handleOpenSummary(exercise.id)}
                        alreadyPurchased={checkPurchase(exercise.id)}
                    />
                ))}
            </div>

            {currentExerciseIdSelected !== null && (
                <>
                    <div className="fixed inset-0 z-50 flex justify-center items-center">
                        <PurchaseSummary onClose={handleCloseSummary} selectedExerciseProp={selectedExercise!} />
                    </div>
                </>
            )}
        </div>
    );
};

export default Gallery;
