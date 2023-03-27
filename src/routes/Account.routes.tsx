import { Navigate, useParams, useRoutes } from 'react-router-dom';
import { AccountAssets } from 'views/Account/components/AccountAssets';
import { AccountTransactions } from 'views/Account/components/AccountTransactions';

export const AccountRoutes = () => {
    const { account } = useParams();

    const routes = useRoutes([
        {
            path: '/',
            element: <Navigate to="transactions" replace />,
        },
        {
            path: '/transactions/*',
            element: <AccountTransactions account={account ?? ''} />,
        },
        {
            path: '/assets/*',
            element: <AccountAssets />,
        },
    ]);

    return routes;
};
