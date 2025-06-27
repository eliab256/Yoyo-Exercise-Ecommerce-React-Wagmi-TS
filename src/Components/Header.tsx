import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../redux/pagesSlice';

const Header: React.FC = () => {
    const dispatch = useDispatch();
    return (
        <header className="p-2 md:p-4 flex items-center justify-between fixed top-0 left-0 w-full bg-white shadow-md z-50 h-12 sm:h-14 md:h-14 lg:h-16 xl:h-18">
            <div className="flex items-center space-x-2 cursor-default pr-2">
                <img src="../public/Yoyo-Logo-Scritta-Scura.png" alt="Logo" className="h-10 w-10 rounded-full" />
                <h1 className="hidden md:block text-center font-bold text-lg xl:text-2xl ">
                    Yoyo Exercise Marketplace
                </h1>
                <h1 className="block md:hidden text-center font-bold text-xs sm:text-base">Yoyo</h1>
            </div>
            <div>
                <button
                    className="bg-green-500 text-black px-3 md:px-4 py-2 rounded-xl hover:bg-green-300 cursor-pointer text-sm sm:text-base md:text-lg lg:text-xl"
                    onClick={() => dispatch(setCurrentPage('gallery'))}
                >
                    Gallery
                </button>
            </div>
            <div>
                <button
                    className="bg-green-500 text-black px-3 md:px-4 py-2 rounded-xl hover:bg-green-300 cursor-pointer text-sm sm:text-base md:text-lg lg:text-xl"
                    onClick={() => dispatch(setCurrentPage('yourProducts'))}
                >
                    Your Products
                </button>
            </div>
            <div className="w-[84px] md:w-auto text-sm md:text-lg lg:text-xl">
                <ConnectButton
                    accountStatus={{
                        smallScreen: 'avatar',
                        largeScreen: 'full',
                    }}
                    showBalance={{
                        smallScreen: false,
                        largeScreen: true,
                    }}
                />
            </div>
        </header>
    );
};

export default Header;
