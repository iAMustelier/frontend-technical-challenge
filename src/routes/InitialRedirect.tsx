import React from 'react';
import { AccountRoot } from 'xrpl/dist/npm/models/ledger';
import { DEFAULT_XRPL_ACCOUNT } from 'constants/xrpl';
import { isNullish } from 'utils/data';
import { Navigate } from 'react-router-dom';
import { useLocalStorage } from 'hooks/useLocalStorage';

export const InitialRedirect = () => {
    const [storedAccount] = useLocalStorage<AccountRoot | null>('xrplAccount', null);

    const redirectTo = isNullish(storedAccount)
        ? `/accounts/${DEFAULT_XRPL_ACCOUNT}`
        : `/accounts/${storedAccount.Account}`;

    return <Navigate to={redirectTo} replace />;
};
