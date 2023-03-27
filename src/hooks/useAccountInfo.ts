import { AccountRoot } from 'xrpl/dist/npm/models/ledger';
import { getAccountInfo } from 'services';
import { isNullish } from 'utils';
import { useClient, useLocalStorage } from 'hooks';
import { useEffect, useState } from 'react';

export const useAccountInfo = (account?: string) => {
    const [accountInfo, setAccountInfo] = useState<AccountRoot | null>(null);
    const [loadingAccountInfo, setLoadingAccountInfo] = useState(true);
    const [error, setError] = useState<unknown>();

    const { client, loading: loadingClient, error: errorClient } = useClient();

    const [storedAccount, setStoredAccount] = useLocalStorage<AccountRoot | null>(
        'xrplAccount',
        null,
    );

    useEffect(() => {
        if (isNullish(account)) {
            setError('No account provided');
            return;
        }

        // If the account is already stored in local storage, use that
        if (storedAccount?.Account === account) {
            setLoadingAccountInfo(false);
            setError(null);
            if (storedAccount?.Account !== accountInfo?.Account) {
                // TODO: there is an issue where the variable account info is not updating
                // ex: Balance (needs refetch)
                setAccountInfo(storedAccount);
            }
            return;
        }

        (async () => {
            if (loadingClient) return;
            if (errorClient) {
                setError(errorClient);
                return;
            }
            try {
                setLoadingAccountInfo(true);
                setError(null);
                // If the account is not stored in local storage, get it from the XRPL
                const accountInfo = await getAccountInfo(client, account);
                const accountData = accountInfo?.result?.account_data;
                setStoredAccount(accountData);
                setAccountInfo(accountData);
            } catch (e) {
                setError(e);
            }
            setLoadingAccountInfo(false);
        })();
    }, [
        account,
        accountInfo?.Account,
        client,
        errorClient,
        loadingClient,
        setStoredAccount,
        storedAccount,
    ]);

    return {
        data: accountInfo,
        loading: loadingClient || loadingAccountInfo,
        error,
    };
};
