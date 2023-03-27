import { AccountDetails } from './components/AccountDetails';
import { AccountRoutes } from 'routes/Account.routes';
import { TabList } from 'components/Tabs';
import { useAccountInfo } from 'hooks';
import { useParams } from 'react-router-dom';

export const AccountInfo = () => {
    const { account } = useParams();

    const { data: accountInfo, loading, error } = useAccountInfo(account);

    if (!account) return <h2>No account specified</h2>;

    if (loading) return <h2>Loading...</h2>;
    if (error) return <h2>Error getting account info.</h2>;
    if (!accountInfo) return <h2>No account info</h2>;

    const tabs = [
        {
            label: 'Transactions',
            redirectTo: `transactions`,
        },
        {
            label: 'Assets',
            redirectTo: `assets`,
        },
    ];

    return (
        <>
            <AccountDetails accountInfo={accountInfo} />

            <TabList tabs={tabs} />

            <AccountRoutes />
        </>
    );
};
