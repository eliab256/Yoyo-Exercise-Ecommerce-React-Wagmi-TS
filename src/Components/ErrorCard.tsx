import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';
import { type statusType } from '../Components/ErrorsResume';
import LoadingSpinner from './LoadingSpinner';

export interface ErrorCardProps {
    status: statusType;
    alertMessage: string;
    confirmMessage: string;
}

const ErrorCard: React.FC<ErrorCardProps> = ({ status, alertMessage, confirmMessage }) => {
    switch (status) {
        case null:
            return null;

        case 'loading':
            return (
                <div>
                    <div
                        className="bg-blue-500 rounded-full active:scale-95 active:bg-blue-600 
                        transition transform duration-150 shadow-md cursor-pointer p-2"
                    >
                        <LoadingSpinner size="12" color="grey" borderColor="blue" />
                    </div>
                </div>
            );

        case 'success':
            return (
                <div className="flex items-center space-x-2 my-2">
                    <div
                        className="bg-green-500 rounded-full active:scale-95 active:bg-green-600 
                        transition transform duration-150 shadow-md cursor-pointer p-2"
                    >
                        <CheckIcon className="w-3 h-3 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 text-white" />
                    </div>
                    <p className="font-bold animate-pulse text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-green-500">
                        {confirmMessage}
                    </p>
                </div>
            );

        case 'error':
            return (
                <div className="flex items-center space-x-2 my-2">
                    <div
                        className="bg-red-500 rounded-full active:scale-95 active:bg-red-600 
                        transition transform duration-150 shadow-md cursor-pointer p-2"
                    >
                        <XMarkIcon className="w-3 h-3 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 text-white" />
                    </div>
                    <p className="font-bold animate-pulse text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-red-500">
                        {alertMessage}
                    </p>
                </div>
            );
    }
};

export default ErrorCard;
