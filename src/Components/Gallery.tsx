import ExerciseCard from './ExerciseCard';
import PurchaseSummary from './PurchaseSummary';
import exercisesCardData from '../Data/ExerciseCardData';
import { useState } from 'react';

const Gallery: React.FC = () => {
    const [currentExerciseIdSelected, setCurrentExerciseIdSelected] = useState<number | null>(null);
    const selectedExercise = exercisesCardData.find(ex => ex.id === currentExerciseIdSelected);

    const handleOpenSummary = (id: number) => {
        setCurrentExerciseIdSelected(id);
        console.log(`Esercizio selezionato con ID: ${id}`);
    };

    const handleCloseSummary = () => {
        setCurrentExerciseIdSelected(null);
    };

    return (
        <div className="relative">
            <div
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 
                            px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 pt-2
                            transition-opacity duration-300
                            ${currentExerciseIdSelected !== null ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
            >
                {exercisesCardData.map(exercise => (
                    <ExerciseCard
                        key={exercise.id}
                        exerciseProp={exercise}
                        onPurchase={() => handleOpenSummary(exercise.id)}
                    />
                ))}
            </div>

            {currentExerciseIdSelected !== null && (
                <>
                    <div className="fixed inset-0 bg-black/30 z-40" onClick={handleCloseSummary} />
                    <div className="fixed inset-0 z-50 flex justify-center items-center">
                        <PurchaseSummary onClose={handleCloseSummary} selectedExerciseProp={selectedExercise!} />
                    </div>
                </>
            )}
        </div>
    );
};

export default Gallery;
