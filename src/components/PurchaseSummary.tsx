import { XMarkIcon } from '@heroicons/react/24/solid';
import { type ExerciseCardData } from '../data/ExerciseCardData';
import { useState, useEffect } from 'react';
import ErrorsResume from './ErrorsResume';
import { usePurchases } from '../hooks/usePurchases';
import LoadingSpinner from './LoadingSpinner';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedExercise } from '../redux/selectedExerciseSlice';
import { type statusType, resetErrorsStatus } from '../redux/errorsStatusSlice';

export interface PurchaseSummaryProps {
    selectedExerciseProp: ExerciseCardData;
}

const PurchaseSummary: React.FC<PurchaseSummaryProps> = ({ selectedExerciseProp }) => {
    const dispatch = useDispatch();
    const { name, imageUrl, price, deepDescription, id } = selectedExerciseProp;
    const [showErrorsResume, setShowErrorsResume] = useState(false);
    const [hasPurchased, setHasPurchased] = useState(false);
    const errorCheckStatus = useSelector(
        (state: {
            errorsStatus: {
                connection: statusType;
                balance: statusType;
                alreadyPurchased: statusType;
            };
        }) => ({
            connection: state.errorsStatus.connection,
            balance: state.errorsStatus.balance,
            alreadyPurchased: state.errorsStatus.alreadyPurchased,
        })
    );

    const { addPurchase, isPending, isConfirmed, isConfirming } = usePurchases();

    useEffect(() => {
        dispatch(resetErrorsStatus());
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
                dispatch(resetErrorsStatus());
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
            p-2 sm:p-3 md:p-4 lg:p-10 w-[95%] sm:w-[90%] md:w-4/5 lg:w-1/2 mx-auto my-3 sm:my-4 md:my-5 lg:my-6
            border border-gray-300 shadow-lg min-h-[calc(100vh-48px)] max-h-[100vh] overflow-y-auto cursor-default"
        >
            {/* Close Button */}
            <div
                className="absolute top-3 right-3 bg-red-500 rounded-full active:scale-95 active:bg-red-600 
                transition-transform duration-150 shadow-md cursor-pointer p-2"
                onClick={() => dispatch(clearSelectedExercise())}
            >
                <XMarkIcon className="h-4 w-4 text-white" />
            </div>

            {/* Title */}
            <div className="flex flex-col items-center w-full mb-1 md:mb-4">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center">{name}</h2>
            </div>

            {/* Image */}
            <div className="flex flex-col items-center w-full mb-4 pt-4 sm:pt-6">
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-full max-w-[180px] sm:max-w-[220px] md:max-w-[260px] lg:max-w-[220px] xl:max-w-[300px] h-auto object-cover rounded-md"
                />
            </div>

            {/* Description */}
            <div className="flex flex-col items-center w-full mb-2 px-4 sm:px-6 md:px-8 text-xs sm:text-base md:text-lg">
                <p className="text-gray-600 text-justify">{deepDescription}</p>
            </div>

            {/* Price */}
            <div className="flex flex-col items-center w-full mb-6 text-lg sm:text-lg md:text-xl">
                <p className="font-bold text-violet-600">Price: {price} ETH</p>
            </div>

            {/* Purchase Button */}
            {!isPending && (
                <div className="flex flex-col items-center w-full">
                    <button
                        className="bg-violet-600 text-white text-lg sm:text-base md:text-lg px-10 sm:px-8 py-4 sm:py-3 rounded-xl shadow-md 
                    hover:bg-violet-700 active:bg-violet-800 transition-transform duration-150 cursor-pointer"
                        onClick={() => handleShowErrorResume()}
                    >
                        Purchase
                    </button>
                </div>
            )}

            {/* Error Resume */}
            {showErrorsResume && !isPending && !isConfirmed && !isConfirming && (
                <div className="w-full mt-4">
                    <ErrorsResume price={price} id={id} />
                </div>
            )}

            {/* Pending Spinner */}
            {isPending && (
                <div className="mt-6 flex flex-col items-center">
                    <LoadingSpinner />
                    <p className="mt-2 text-gray-600 text-sm sm:text-base">Transaction in progress... please wait.</p>
                </div>
            )}
            {/* Waiting for Confirmation */}
            {isConfirming && (
                <div className="mt-6 flex flex-col items-center">
                    <p className="text-green-600 text-lg sm:text-xl font-bold text-center">
                        Purchase waiting for confirmation on-chain
                    </p>
                    <p className="text-gray-600 text-sm sm:text-base">Please, wait for some seconds</p>
                </div>
            )}

            {/* Purchase Confirmation */}
            {isConfirmed && (
                <div className="mt-6 flex flex-col items-center text-center">
                    <p className="text-green-600 text-lg sm:text-xl font-bold">Purchase Successful!</p>
                    <p className="text-gray-600 text-sm sm:text-base">Thank you for your purchase!</p>
                </div>
            )}
        </div>
    );
};

export default PurchaseSummary;
