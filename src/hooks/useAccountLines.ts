import { AccountLinesResponse } from 'xrpl';
import { getAccountLines } from 'services';
import { useClient } from 'hooks';
import { useEffect, useState } from 'react';

export const useAccountLines = (account: string) => {
    const [linesData, setLinesData] = useState<AccountLinesResponse | undefined>();
    const [loadingLines, setLoadingLines] = useState(true);
    const [error, setError] = useState<unknown>();

    const { client, loading: loadingClient } = useClient();

    useEffect(() => {
        (async () => {
            if (loadingClient || !client?.isConnected()) return;
            try {
                setLoadingLines(true);
                setError(null);
                const lines = await getAccountLines(client, account);
                setLinesData(lines);
            } catch (e) {
                setError(e);
            }
            setLoadingLines(false);
        })();
    }, [account, client, loadingClient]);

    return {
        data: linesData,
        lines: linesData?.result?.lines,
        loading: loadingClient || loadingLines,
        error,
    };
};
