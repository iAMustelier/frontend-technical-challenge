import React from 'react';

export interface TableColumn<T> {
    header: string;
    accessor: keyof T;
}

export interface TableData<T> {
    data: T;
    additionalData?: JSX.Element;
}

export interface TableProps<T> {
    columns: TableColumn<T>[];
    rows: TableData<T>[];
    noDataMessage?: string;
}

export const Table = <T,>({ columns, rows, noDataMessage = 'No data' }: TableProps<T>) => {
    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full border-b-[1px] border-solid border-gray">
                <thead>
                    <tr className="border-b-[1px] border-solid border-gray">
                        {columns.map((column, i) => (
                            <th
                                key={column.header}
                                className={`px-5 py-5 text-left border-b-[1px] border-gray text-xs text-lgray font-bold ${
                                    i === columns.length - 1 ? 'text-right' : ''
                                }`}
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.length ? (
                        rows.map((row, index) => (
                            <React.Fragment key={index}>
                                <tr>
                                    {columns.map((column, index) => (
                                        <td
                                            key={index}
                                            className={`px-4 py-2 border-t-[1px] border-solid border-gray text-sm ${
                                                index === columns.length - 1 ? 'text-right' : ''
                                            }`}
                                        >
                                            {row.data[column.accessor] as JSX.Element}
                                        </td>
                                    ))}
                                </tr>
                                {row.additionalData && (
                                    <tr>
                                        <td colSpan={columns.length}>{row.additionalData}</td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="p-4 border-b border-solid border-gray text-center"
                            >
                                <p className="text-lgray">{noDataMessage}</p>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
