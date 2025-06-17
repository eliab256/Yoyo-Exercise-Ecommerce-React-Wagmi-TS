import Header from './Components/Header';
import Gallery from './Components/Gallery';
import YourProductsPage from './Components/YourProductsPage';
import { useState } from 'react';

function App() {
    const [currentPage, setCurrentPage] = useState<'gallery' | 'yourProducts'>('gallery');
    return (
        <div className="">
            <Header
                onGalleryClick={() => setCurrentPage('gallery')}
                onYourProductClick={() => setCurrentPage('yourProducts')}
            />
            <main className="relative w-full mt-12 sm:mt-14 md:mt-14 lg:mt-16 xl:mt-18 bg-[url(/WebSite-Background.jpg)] bg-cover bg-center bg-no-repeat min-h-screen bg-fixed">
                {currentPage === 'gallery' && <Gallery />}
                {currentPage === 'yourProducts' && <YourProductsPage />}
            </main>
        </div>
    );
}

export default App;
