import { AccountTxResponse } from 'xrpl';
import { getAccountTransactions } from 'services';
import { useClient } from 'hooks';
import { useEffect, useState } from 'react';

export const useAccountTransactions = (account: string) => {
    const [transactionsData, setTransactionsData] = useState<AccountTxResponse | undefined>();
    const [loadingTransactions, setLoadingTransactions] = useState(true);
    const [error, setError] = useState<unknown>();

    const { client, loading: loadingClient } = useClient();

    useEffect(() => {
        (async () => {
            if (loadingClient || !client?.isConnected()) return;
            try {
                setLoadingTransactions(true);
                setError(null);
                const transactions = await getAccountTransactions(client, account);
                setTransactionsData(transactions);
            } catch (e) {
                setError(e);
            }
            setLoadingTransactions(false);
        })();
    }, [account, client, loadingClient]);

    return {
        data: transactionsData,
        transactions: transactionsData?.result?.transactions,
        loading: loadingClient || loadingTransactions,
        error,
    };
};
