import { type ExerciseCardData } from '../Data/ExerciseCardData';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useDispatch } from 'react-redux';
import { clearSelectedExercise } from '../redux/selectedExerciseSlice';

export interface DownloadPageProps {
    selectedExerciseProp: ExerciseCardData;
    transactionTx: number;
}

const DownloadPage: React.FC<DownloadPageProps> = ({ selectedExerciseProp, transactionTx }) => {
    const { name, imageUrl, id } = selectedExerciseProp;
    const dispatch = useDispatch();

    const onDownload = async () => {};

    return (
        <div
            className="relative flex flex-col items-center rounded-xl bg-white/95 backdrop-blur-sm
             p-4 sm:p-6 md:p-10 w-4/5 lg:w-1/2 mx-auto my-[20px] border border-gray-300 shadow-lg min-h-[calc(100vh-40px)] cursor-default"
        >
            <div
                className="absolute top-4 right-4 bg-red-500 rounded-full active:scale-95 active:bg-red-600 
               transition transform duration-150 shadow-md cursor-pointer p-2"
                onClick={() => dispatch(clearSelectedExercise())}
            >
                <XMarkIcon className="h-6 w-6 text-white" />
            </div>

            <div className="flex flex-col items-center w-full mb-10">
                <h2 className="text-4xl font-bold text-center">{name}</h2>
            </div>
            <img src={imageUrl} alt={name} className="w-full max-w-[400px] h-auto object-cover rounded-md mb-10" />
            <p className="text-gray-600 mb-4 text-center mx-30">
                This is the download page for your exercise. You can download the receipt and bring it to our center to
                access the corresponding exercises.
            </p>
            <span className="absolute bottom-2 left-2 text-xs text-gray-400">Id: {id}</span>
            <div className="flex flex-col items-center w-full mt-10">
                <button
                    className="bg-violet-600 text-white text-lg px-8 py-3 rounded-xl shadow-md 
                    hover:bg-violet-700 active:bg-violet-800 transition transform duration-150 cursor-pointer"
                    onClick={() => onDownload()}
                >
                    Download
                </button>
            </div>
        </div>
    );
};

export default DownloadPage;
