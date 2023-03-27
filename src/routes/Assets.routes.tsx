import { Navigate, useParams, useRoutes } from 'react-router-dom';
import { AccountLines } from 'views/Account/components/AccountLines';
import { AccountNFTs } from 'views/Account/components/AccountNFTs';

export const AssetsRoutes = () => {
    const { account } = useParams();

    const routes = useRoutes([
        {
            path: '/',
            element: <Navigate to="issued" />,
        },
        {
            path: '/issued',
            element: <AccountLines account={account ?? ''} />,
        },
        {
            path: '/nfts',
            element: <AccountNFTs account={account ?? ''} />,
        },
    ]);

    return routes;
};
