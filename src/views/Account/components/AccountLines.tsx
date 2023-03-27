import React from 'react';
import { ArrayElement, formatAmount, isNullish, normalizeCurrencyCode } from 'utils';
import { Table, TableColumn } from 'components/Table';
import { useAccountLines } from 'hooks';

export interface AccountLinesProps {
    account: string;
}

export const AccountLines = ({ account }: AccountLinesProps) => {
    const { lines, loading, error } = useAccountLines(account);

    if (loading) return <h2>Loading...</h2>;
    if (error) return <h2>Error getting lines...</h2>;
    if (isNullish(lines)) return <h2>No lines</h2>;

    type TableLine = Pick<ArrayElement<typeof lines>, 'balance' | 'currency'> & {
        account: JSX.Element;
    };

    const columns: TableColumn<TableLine>[] = [
        { header: 'CURRENCY CODE', accessor: 'currency' },
        { header: 'ISSUER', accessor: 'account' },
        { header: 'AMOUNT', accessor: 'balance' },
    ];

    const rows: { data: TableLine }[] = lines
        .filter((l) => l.balance !== '0')
        .map((line) => {
            const currency = normalizeCurrencyCode(line.currency);
            return {
                data: {
                    currency,
                    account: <p className="text-lprimary">{line.account}</p>,
                    balance: `${formatAmount(line.balance, 10, 2)} ${currency}`,
                },
            };
        });

    return <Table columns={columns} rows={rows} noDataMessage="No tokens found." />;
};
