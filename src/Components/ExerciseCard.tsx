import { useEthereumPrice } from '../Hooks/useEthereumPrice';
import { useMemo } from 'react';
import { type ExerciseCardData } from '../Data/ExerciseCardData';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';

export interface ExerciseCardProps {
    exerciseProp: ExerciseCardData;
    handleClick: (id: number) => void;
    alreadyPurchased: boolean;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exerciseProp, handleClick, alreadyPurchased }) => {
    const { name, description, imageUrl, price, id, deepDescription } = exerciseProp;
    const { price: ethPrice } = useEthereumPrice();

    const usdPrice = useMemo(() => {
        const ethAmount = price;
        return ethAmount * ethPrice;
    }, [price, ethPrice]);

    const formattedUsdPrice = useMemo(() => usdPrice.toFixed(2), [usdPrice]);

    return (
        <div
            onClick={() => handleClick(id)}
            role="button"
            className={`p-4 rounded-xl bg-violet-100 relative flex flex-col items-center text-center shadow-lg transition-all 
                hover:bg-violet-200 active:bg-violet-300 shadow-green-200 cursor-pointer
               `}
        >
            <h2 className="text-xl font-semibold mb-2">{name}</h2>
            <img src={imageUrl} alt={name} className="w-full max-w-[200px] h-auto object-cover rounded-md mb-3" />
            {!alreadyPurchased && (
                <>
                    <p className="text-gray-600 mb-2">{description}</p>
                    <p className="font-bold text-violet-600 mb-6">{price} ETH</p>
                    <p className="font-bold text-zinc-600 mb-6">{formattedUsdPrice} $</p>
                </>
            )}
            {alreadyPurchased && (
                <>
                    <p className="text-gray-600 mb-2">{deepDescription}</p>
                    <div className="absolute bottom-2 right-2">
                        <ShoppingCartIcon></ShoppingCartIcon>
                    </div>
                </>
            )}
            <span className="absolute bottom-2 left-2 text-xs text-gray-400">Id: {id}</span>
        </div>
    );
};

export default ExerciseCard;
