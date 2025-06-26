import { XMarkIcon } from '@heroicons/react/24/solid';
import { type ExerciseCardData } from '../Data/ExerciseCardData';
import { useState, useEffect, useCallback } from 'react';
import ErrorsResume, { type statusType } from './ErrorsResume';
import { usePurchases } from '../Hooks/usePurchases';
import LoadingSpinner from './LoadingSpinner';
import { useDispatch } from 'react-redux';
import { clearSelectedExercise } from '../redux/selectedExerciseSlice';

export interface PurchaseSummaryProps {
    selectedExerciseProp: ExerciseCardData;
}

const PurchaseSummary: React.FC<PurchaseSummaryProps> = ({ selectedExerciseProp }) => {
    const dispatch = useDispatch();
    const { name, imageUrl, price, deepDescription, id } = selectedExerciseProp;
    const [showErrorsResume, setShowErrorsResume] = useState(false);
    const [hasPurchased, setHasPurchased] = useState(false);
    const [errorCheckStatus, setErrorCheckStatus] = useState<{
        connection: statusType;
        balance: statusType;
        alreadyPurchased: statusType;
    } | null>(null);
    const { addPurchase, isPending } = usePurchases();

    const handleStatusChange = useCallback(
        (statuses: { connection: statusType; balance: statusType; alreadyPurchased: statusType }) => {
            setErrorCheckStatus(statuses);
        },
        []
    );

    useEffect(() => {
        setErrorCheckStatus(null);
        setShowErrorsResume(false);
        setHasPurchased(false);
    }, [id]);

    useEffect(() => {
        if (
            errorCheckStatus &&
            errorCheckStatus.connection === 'success' &&
            errorCheckStatus.balance === 'success' &&
            errorCheckStatus.alreadyPurchased === 'success' &&
            !hasPurchased
        ) {
            const timer = setTimeout(() => {
                console.log('Acquisto effettuato!');
                addPurchase(id, price);
                setErrorCheckStatus(null);
                setHasPurchased(true);
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [errorCheckStatus, id, price, hasPurchased, addPurchase]);

    function handleShowErrorResume() {
        setShowErrorsResume(true);
        setHasPurchased(false);
    }

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
                <XMarkIcon className="h-4 w-4 text-white" />
            </div>

            <div className="flex flex-col items-center w-full mb-4">
                <h2 className="text-3xl font-bold text-center">{name}</h2>
            </div>

            <div className="flex flex-col items-center w-full mb-2 pt-6">
                <img src={imageUrl} alt={name} className="w-full max-w-[300px] h-auto object-cover rounded-md" />
            </div>

            <div className="flex flex-col items-center w-full mb-2 px-6 py-4 text-lg">
                <p className="text-gray-600 text-justify">{deepDescription}</p>
            </div>

            <div className="flex flex-col items-center w-full mb-6 text-2xl">
                <p className="font-bold text-violet-600">Price: {price} ETH</p>
            </div>

            {!isPending && (
                <div className="flex flex-col items-center w-full">
                    <button
                        className="bg-violet-600 text-white text-lg px-8 py-3 rounded-xl shadow-md 
                    hover:bg-violet-700 active:bg-violet-800 transition transform duration-150 cursor-pointer"
                        onClick={() => handleShowErrorResume()}
                    >
                        Purchase
                    </button>
                </div>
            )}
            {showErrorsResume && !isPending && (
                <div>
                    <ErrorsResume price={price} id={id} onStatusChange={handleStatusChange} />
                </div>
            )}

            {isPending && (
                <div className="mt-6 flex flex-col items-center">
                    <LoadingSpinner />
                    <p className="mt-2 text-gray-600">Transaction in progress... please wait.</p>
                </div>
            )}
        </div>
    );
};

export default PurchaseSummary;
