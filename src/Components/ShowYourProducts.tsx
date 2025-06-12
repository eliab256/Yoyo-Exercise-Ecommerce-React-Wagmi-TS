import { type Address } from 'viem';

type ShowYourProductsProps = {
    address: Address;
};

const ShowYourProducts: React.FC<ShowYourProductsProps> = ({ address }) => {
    return <div>ritorna i tuoi prodotti per l'indirizzo: {address}</div>;
};

export default ShowYourProducts;
