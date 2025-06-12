import { useState, useEffect } from 'react';

export const useEthereumPrice = () => {
    const [price, setPrice] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPrice = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
                );

                if (!response.ok) throw new Error('Failed to fetch');

                const data = await response.json();
                setPrice(data.ethereum.usd);
                setError(null);
            } catch (err) {
                setError('Failed to fetch ETH price');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPrice();
    }, []);

    return { price, loading, error };
};

// Uso nel componente
// const MyComponent = () => {
//     const { price, loading, error } = useEthereumPrice();

//     if (loading) return <div>Loading price...</div>;
//     if (error) return <div>Error: {error}</div>;

//     return <div>ETH Price: ${price.toFixed(2)}</div>;
// };
