import ExerciseCard from './ExerciseCard';
import PurchaseSummary from './PurchaseSummary';
import exercisesCardData from '../Data/ExerciseCardData';
import { useSelector } from 'react-redux';
import { type ExerciseId } from '../redux/selectedExerciseSlice';

const Gallery: React.FC = () => {
    const currentExerciseIdSelected = useSelector(
        (state: { selectedExercise: { id: ExerciseId } }) => state.selectedExercise.id
    );
    const selectedExercise = exercisesCardData.find(ex => ex.id === currentExerciseIdSelected);

    return (
        <div className="relative">
            <div
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6
                            px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 pt-4
                            transition-opacity duration-300
                            ${currentExerciseIdSelected !== null ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
            >
                {exercisesCardData.map(exercise => (
                    <ExerciseCard key={exercise.id} exerciseProp={exercise} />
                ))}
            </div>

            {currentExerciseIdSelected !== null && (
                <>
                    <div className="fixed inset-0 z-50 flex justify-center items-center">
                        <PurchaseSummary selectedExerciseProp={selectedExercise!} />
                    </div>
                </>
            )}
        </div>
    );
};

export default Gallery;
