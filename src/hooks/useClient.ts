import { Client } from 'xrpl';
import { useEffect, useMemo, useState } from 'react';

export const useClient = () => {
    const [error, setError] = useState<unknown>();
    const [loading, setLoading] = useState(true);

    const client = useMemo(() => new Client(process.env.REACT_APP_NET_URL), []);

    useEffect(() => {
        (async () => {
            setError(null);
            setLoading(true);
            try {
                await client.connect();
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        })();

        return () => {
            client.disconnect();
        };
    }, [client]);

    return {
        client,
        loading,
        error,
    };
};
