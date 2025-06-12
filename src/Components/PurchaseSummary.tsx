import { XMarkIcon } from '@heroicons/react/24/solid';
import { type ExerciseCardData } from '../Data/ExerciseCardData';
import ErrorsResume from './ErrorsResume';

export interface PurchaseSummaryProps {
    onClose: () => void;
    selectedExerciseProp: ExerciseCardData;
}

const PurchaseSummary: React.FC<PurchaseSummaryProps> = ({ onClose, selectedExerciseProp }) => {
    const { name, imageUrl, price, deepDescription, id } = selectedExerciseProp;

    function completePurchase() {}

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

            <div className="flex flex-col items-center w-full mb-4 pt-6">
                <img src={imageUrl} alt={name} className="w-full max-w-[300px] h-auto object-cover rounded-md" />
            </div>

            <div className="flex flex-col items-center w-full mb-4 px-10 py-6 text-lg">
                <p className="text-gray-600 text-justify">{deepDescription}</p>
            </div>

            <div className="flex flex-col items-center w-full mb-6 text-2xl">
                <p className="font-bold text-violet-600">Price: {price} ETH</p>
            </div>

            <div className="flex flex-col items-center w-full">
                <button
                    className="bg-violet-600 text-white px-6 py-2 rounded-lg shadow-md 
                 hover:bg-violet-700 active:bg-violet-800 transition transform duration-150  cursor-pointer"
                    onClick={() => completePurchase()}
                >
                    Purchase
                </button>
            </div>
            <div>
                <ErrorsResume price={price} id={id} />
            </div>
        </div>
    );
};

export default PurchaseSummary;
