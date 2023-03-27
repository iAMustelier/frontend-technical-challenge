import { ArrayElement, isNullish } from 'utils';
import { Table, TableColumn } from 'components/Table';
import { useAccountNFTs } from 'hooks';

export interface AccountNFTsProps {
    account: string;
}

export const AccountNFTs = ({ account }: AccountNFTsProps) => {
    const { nfts, loading, error } = useAccountNFTs(account);

    if (loading) return <h2>Loading...</h2>;
    if (error) return <h2>Error getting transactions...</h2>;
    if (isNullish(nfts)) return <h2>No NFTs</h2>;

    type TableNFT = Pick<ArrayElement<typeof nfts>, 'NFTokenTaxon'> & {
        NFTokenID: JSX.Element;
        Issuer: JSX.Element;
    };

    const columns: TableColumn<TableNFT>[] = [
        { header: 'TOKEN ID', accessor: 'NFTokenID' },
        { header: 'ISSUER', accessor: 'Issuer' },
        { header: 'TAXON', accessor: 'NFTokenTaxon' },
    ];

    const rows: { data: TableNFT }[] = nfts.map((nft) => ({
        data: {
            NFTokenID: <p className="text-lprimary">{nft.NFTokenID}</p>,
            Issuer: <p className="text-lprimary">{nft.Issuer}</p>,
            NFTokenTaxon: nft.NFTokenTaxon,
        },
    }));

    return <Table columns={columns} rows={rows} noDataMessage="No NFTs found." />;
};
