import React from 'react';
import { ArrayElement, formatDateTime, formatStatus } from 'utils';
import { Badge } from 'components/Badge';
import { ReactComponent as PlayLogo } from 'assets/play.svg';
import { ReactComponent as CheckedLogo } from 'assets/checked.svg';
import { Table, TableColumn } from 'components/Table';
import { usePayments } from 'hooks';

export interface AccountTransactionsProps {
    account: string;
}

export const AccountTransactions = ({ account }: AccountTransactionsProps) => {
    const accountPayments = usePayments(account);

    if (accountPayments.loading) return <h2>Loading...</h2>;
    if (accountPayments.error) return <h2>Error getting transactions...</h2>;
    if (!accountPayments.transactions) return <h2>No transactions</h2>;

    type TablePayment = Pick<ArrayElement<typeof accountPayments.transactions>, 'Account'> & {
        Type: JSX.Element;
        Status: JSX.Element;
        DateTimeUTC: string;
    };

    const columns: TableColumn<TablePayment>[] = [
        { header: 'ACCOUNT', accessor: 'Account' },
        { header: 'TRANSACTION TYPE', accessor: 'Type' },
        { header: 'STATUS', accessor: 'Status' },
        { header: 'DATE/TIME (UTC)', accessor: 'DateTimeUTC' },
    ];

    const rows: { data: TablePayment; additionalData: JSX.Element }[] =
        accountPayments.transactions.map((payment) => ({
            data: {
                Account: payment.Account,
                Type: (
                    <Badge
                        icon={<PlayLogo />}
                        text={payment.Type.toUpperCase()}
                        className=" bg-dprimary border-solid border-primary border py-0 w-fit [&>p]:font-bold  [&>p]:text-white"
                    />
                ),
                Status: (
                    <Badge
                        icon={<CheckedLogo />}
                        text={formatStatus(payment.Status)}
                        className="justify-start text-primary"
                    />
                ),
                DateTimeUTC: formatDateTime(payment.DateTime.toUTC()),
            },
            additionalData: (
                <div className="p-8 bg-neutral-900 text-xs text-lgray">
                    <span className="font-bold">SEND </span>
                    <span>{payment.Amount}</span>
                    <span> TO </span>
                    <span className="text-lprimary">{payment.Receiver}</span>
                </div>
            ),
        }));

    return <Table columns={columns} rows={rows} noDataMessage="No transactions found." />;
};
