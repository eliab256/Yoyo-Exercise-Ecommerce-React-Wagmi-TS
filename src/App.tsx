import Header from './Components/Header';
import Gallery from './Components/Gallery';
import YourProductsPage from './Components/YourProductsPage';
import { useSelector } from 'react-redux';
import { type PageState } from './redux/pagesSlice';

function App() {
    const currentOpenPage = useSelector(
        (state: { currentPage: { currentPage: PageState } }) => state.currentPage.currentPage
    );

    const pageComponents = {
        gallery: <Gallery />,
        yourProducts: <YourProductsPage />,
    };

    return (
        <div>
            <Header />
            <main className="relative w-full mt-12 sm:mt-14 md:mt-14 lg:mt-16 xl:mt-18 bg-[url(/WebSite-Background.jpg)] bg-cover bg-center bg-no-repeat min-h-screen bg-fixed">
                {pageComponents[currentOpenPage]}
            </main>
        </div>
    );
}

export default App;
