import Header from './Components/Header';
import Gallery from './Components/Gallery';
import YourProductsPage from './Components/YourProductsPage';
import { useState } from 'react';

function App() {
    const [currentPage, setCurrentPage] = useState<'gallery' | 'yourProducts'>('gallery');
    return (
        <div className="bg-[url(/WebSite-Background.jpg)] bg-cover bg-center bg-no-repeat min-h-screen overflow-auto">
            <Header
                onGalleryClick={() => setCurrentPage('gallery')}
                onYourProductClick={() => setCurrentPage('yourProducts')}
            />
            <main className="relative w-full mt-12 sm:mt-16 md:mt-20 lg:mt-20 xl:mt-20">
                {currentPage === 'gallery' && <Gallery />}
                {currentPage === 'yourProducts' && <YourProductsPage />}
            </main>
        </div>
    );
}

export default App;
