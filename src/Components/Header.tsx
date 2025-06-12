import { ConnectButton } from '@rainbow-me/rainbowkit';

interface HeaderProps {
    onGalleryClick: () => void;
    onYourProductClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onGalleryClick, onYourProductClick }) => {
    return (
        <header className="flex items-center justify-between p-4 fixed top-0 left-0 w-full bg-white shadow-md z-50  h-12 sm:h-16 md:h-16 lg:h-18 xl:h-20">
            <div className="flex items-center space-x-2 cursor-default">
                <img src="../public/Yoyo-Logo-Scritta-Scura.png" alt="Logo" className="h-10 w-10 rounded-full" />
                <h1 className="text-xl font-bold">Yoyo Exercise Marketplace</h1>
            </div>
            <div>
                <button
                    className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-300 cursor-pointer"
                    onClick={onGalleryClick}
                >
                    Gallery
                </button>
            </div>
            <div>
                <button
                    className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-300 cursor-pointer"
                    onClick={onYourProductClick}
                >
                    Your Products
                </button>
            </div>
            <ConnectButton />
        </header>
    );
};

export default Header;
