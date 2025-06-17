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
                        className=" bg-green-500 rounded-full active:scale-95 active:bg-green-600 
                       transition transform duration-150 shadow-md cursor-pointer p-2"
                    >
                        <CheckIcon className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-lg text-green-500 animate-pulse font-bold">{confirmMessage}</p>
                </div>
            );

        case 'error':
            return (
                <div className="flex items-center space-x-2 my-2">
                    <div
                        className=" bg-red-500 rounded-full active:scale-95 active:bg-red-600 
                       transition transform duration-150 shadow-md cursor-pointer p-2"
                    >
                        <XMarkIcon className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-lg text-red-500 animate-pulse font-bold">{alertMessage}</p>
                </div>
            );
    }
};

export default ErrorCard;
