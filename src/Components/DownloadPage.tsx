import { type ExerciseCardData } from '../Data/ExerciseCardData';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useDispatch } from 'react-redux';
import { clearSelectedExercise } from '../redux/selectedExerciseSlice';

export interface DownloadPageProps {
    selectedExerciseProp: ExerciseCardData;
}

const DownloadPage: React.FC<DownloadPageProps> = ({ selectedExerciseProp }) => {
    const { name, imageUrl, id } = selectedExerciseProp;
    const dispatch = useDispatch();

    const onDownload = async () => {
        console.log('Download initiated for exercise:', name);
    };

    return (
        <div
            className="relative flex flex-col items-center rounded-xl bg-white/95 backdrop-blur-sm
            p-2 sm:p-3 md:p-4 lg:p-10 w-[95%] sm:w-[90%] md:w-4/5 lg:w-1/2 mx-auto my-3 sm:my-4 md:my-5 lg:my-6
            border border-gray-300 shadow-lg min-h-[calc(100vh-48px)] max-h-[100vh] overflow-y-auto cursor-default"
        >
            <div
                className="absolute top-4 right-4 bg-red-500 rounded-full active:scale-95 active:bg-red-600 
               transition-transform duration-150 shadow-md cursor-pointer p-2"
                onClick={() => dispatch(clearSelectedExercise())}
            >
                <XMarkIcon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
            </div>

            <div className="flex flex-col items-center w-full mb-6 sm:mb-8 md:mb-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">{name}</h2>
            </div>

            <img
                src={imageUrl}
                alt={name}
                className="w-full max-w-[220px] sm:max-w-[260px] md:max-w-[300px] h-auto object-cover rounded-md mb-6 sm:mb-8 md:mb-10"
            />

            <p className="text-gray-600 mb-4 px-4 sm:px-6 md:px-8 text-center text-sm sm:text-base md:text-lg">
                This is the download page for your exercise. You can download the receipt and bring it to our center to
                access the corresponding exercises.
            </p>

            <span className="absolute bottom-2 left-2 text-xs text-gray-400">Id: {id}</span>

            <div className="flex flex-col items-center w-full mt-6 sm:mt-8 md:mt-10">
                <button
                    className="bg-violet-600 text-white text-lg sm:text-base md:text-lg px-10 sm:px-8 py-4 sm:py-3 rounded-xl shadow-md 
                    hover:bg-violet-700 active:bg-violet-800 transition-transform duration-150 cursor-pointer"
                    onClick={() => onDownload()}
                >
                    Download
                </button>
            </div>
        </div>
    );
};

export default DownloadPage;
