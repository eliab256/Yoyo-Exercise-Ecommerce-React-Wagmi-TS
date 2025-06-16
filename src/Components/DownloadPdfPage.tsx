import { type ExerciseCardData } from '../Data/ExerciseCardData';
import { XMarkIcon } from '@heroicons/react/24/solid';

export interface DownloadPageProps {
    selectedExerciseProp: ExerciseCardData;
    transaxtionTx: number;
    onClose: () => void;
}

const DownloadPage: React.FC<DownloadPageProps> = ({ selectedExerciseProp, transaxtionTx, onClose }) => {
    const { name, id } = selectedExerciseProp;

    const onDownload = async () => {};

    return (
        <div
            className="relative flex flex-col items-center rounded-xl bg-white/95 backdrop-blur-sm
             p-4 sm:p-6 md:p-10 w-4/5 lg:w-1/2 mx-auto my-[20px] border border-gray-300 shadow-lg min-h-[calc(100vh-40px)] cursor-default"
        >
            <div
                className="absolute top-4 right-4 bg-red-500 rounded-full active:scale-95 active:bg-red-600 
               transition transform duration-150 shadow-md cursor-pointer p-2"
                onClick={() => onClose()}
            >
                <XMarkIcon className="h-6 w-6 text-white" />
            </div>

            <div className="flex flex-col items-center w-full mb-4">
                <h2 className="text-4xl font-bold text-center">{name}</h2>
            </div>
            <span className="absolute bottom-2 left-2 text-xs text-gray-400">Id: {id}</span>
            <div className="flex flex-col items-center w-full">
                <button
                    className="bg-violet-600 text-white px-6 py-2 rounded-lg shadow-md 
                 hover:bg-violet-700 active:bg-violet-800 transition transform duration-150  cursor-pointer"
                    onClick={() => onDownload()}
                >
                    Download
                </button>
            </div>
        </div>
    );
};

export default DownloadPage;
