import { useEthereumPrice } from '../Hooks/useEthereumPrice';
import { useMemo } from 'react';
import { type ExerciseCardData } from '../Data/ExerciseCardData';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { usePurchases } from '../Hooks/usePurchases';
import { useSelector } from 'react-redux';
import { type PageState } from '../redux/pagesSlice';
import { useDispatch } from 'react-redux';
import { setSelectedExercise } from '../redux/selectedExerciseSlice';

export interface ExerciseCardProps {
    exerciseProp: ExerciseCardData;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exerciseProp }) => {
    const dispatch = useDispatch();
    const { name, description, imageUrl, price, id, deepDescription } = exerciseProp;
    const { price: ethPrice } = useEthereumPrice();
    const { purchasesList } = usePurchases();
    const currentOpenPage = useSelector(
        (state: { currentPage: { currentPage: PageState } }) => state.currentPage.currentPage
    );

    const alreadyPurchased = useMemo(() => purchasesList.includes(id), [purchasesList, id]);

    const usdPrice = useMemo(() => {
        try {
            return (price * ethPrice).toFixed(2);
        } catch {
            return '0.00';
        }
    }, [price, ethPrice]);

    return (
        <div
            onClick={() => dispatch(setSelectedExercise(id))}
            role="button"
            className={`p-4 rounded-xl bg-violet-100 relative flex flex-col items-center text-center shadow-lg transition-all 
      hover:bg-violet-200 active:bg-violet-300 shadow-green-200 cursor-pointer`}
        >
            <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-2">{name}</h2>

            <img
                src={imageUrl}
                alt={name}
                className="w-full max-w-[140px] sm:max-w-[160px] md:max-w-[180px] lg:max-w-[200px] h-auto object-cover rounded-md mb-3"
            />

            {!alreadyPurchased && (
                <>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-2">{description}</p>
                    <p className="font-bold text-violet-600 mb-3 text-sm sm:text-base md:text-lg">{price} ETH</p>
                    <p className="font-bold text-zinc-600 mb-6 text-sm sm:text-base md:text-lg">≈ {usdPrice} $</p>
                </>
            )}

            {alreadyPurchased && currentOpenPage === 'gallery' && (
                <>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-2">{description}</p>
                    <p className="font-bold text-violet-600 mb-3 text-sm sm:text-base md:text-lg">{price} ETH</p>
                    <p className="font-bold text-zinc-600 mb-6 text-sm sm:text-base md:text-lg">≈ {usdPrice} $</p>
                    <div className="absolute bottom-2 right-2 text-violet-600">
                        <ShoppingCartIcon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                    </div>
                </>
            )}

            {alreadyPurchased && currentOpenPage === 'yourProducts' && (
                <>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-2">{deepDescription}</p>
                </>
            )}

            <span className="absolute bottom-2 left-2 text-[10px] sm:text-xs text-gray-400">Id: {id}</span>
        </div>
    );
};

export default ExerciseCard;
