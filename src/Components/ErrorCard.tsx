import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';
import { type statusType } from '../Components/ErrorsResume';
import LoadingSpinner from './LoadingSpinner';

export interface ErrorCardProps {
    status: statusType;
    alertMessage: string;
    confirmMessage: string;
}

const ErrorCard: React.FC<ErrorCardProps> = ({ status, alertMessage, confirmMessage }) => {
    if (status === 'loading') {
        return (
            <div>
                <div
                    className="absolute top-4 right-4 bg-red-500 rounded-full active:scale-95 active:bg-red-600 
               transition transform duration-150 shadow-md cursor-pointer p-2"
                >
                    <LoadingSpinner size="12" color="grey" borderColor="blue" />
                </div>
            </div>
        );
    } else if (status === 'success') {
        return (
            <div>
                <div
                    className="absolute top-4 right-4 bg-green-500 rounded-full active:scale-95 active:bg-green-600 
               transition transform duration-150 shadow-md cursor-pointer p-2"
                >
                    <CheckIcon className="h-6 w-6 text-white" />
                </div>
                <p>{confirmMessage}</p>
            </div>
        );
    }
    if (status === 'error') {
        return (
            <div>
                <div
                    className="absolute top-4 right-4 bg-red-500 rounded-full active:scale-95 active:bg-red-600 
               transition transform duration-150 shadow-md cursor-pointer p-2"
                >
                    <XMarkIcon className="h-6 w-6 text-white" />
                </div>
                <p>{alertMessage}</p>
            </div>
        );
    }
};

export default ErrorCard;
