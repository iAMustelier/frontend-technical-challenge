import { AccountNFTsResponse } from 'xrpl';
import { getAccountNFTs } from 'services';
import { useClient } from 'hooks';
import { useEffect, useState } from 'react';

export const useAccountNFTs = (account: string) => {
    const [nftsData, setNFTsData] = useState<AccountNFTsResponse | undefined>();
    const [loadingNFTs, setLoadingNFTs] = useState(true);
    const [error, setError] = useState<unknown>();

    const { client, loading: loadingClient } = useClient();

    useEffect(() => {
        (async () => {
            if (loadingClient || !client?.isConnected()) return;

            try {
                setLoadingNFTs(true);
                setError(null);
                const nfts = await getAccountNFTs(client, account);
                setNFTsData(nfts);
            } catch (e) {
                setError(e);
            }
            setLoadingNFTs(false);
        })();
    }, [account, client, loadingClient]);

    return {
        data: nftsData,
        nfts: nftsData?.result?.account_nfts,
        loading: loadingClient || loadingNFTs,
        error,
    };
};
