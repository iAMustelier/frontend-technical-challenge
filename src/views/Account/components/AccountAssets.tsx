import React, { useEffect, useState } from 'react';
import { AssetsRoutes } from 'routes';
import { RadioSelector } from 'components/RadioSelector';
import { useMatch, useNavigate } from 'react-router-dom';

export interface AccountAssetsProps {}

export const AccountAssets = (props: AccountAssetsProps) => {
    const [initialAssetType, setInitialAssetType] = useState('issued');

    const match = useMatch(`/accounts/:account/assets/:assetType`);

    useEffect(() => {
        setInitialAssetType(match?.params?.assetType ?? 'issued');
    }, [match?.params?.assetType]);

    const navigate = useNavigate();

    const options = [
        {
            label: 'Issued Tokens',
            value: 'issued',
        },
        {
            label: 'Non-Fungible Tokens',
            value: 'nfts',
        },
    ];

    const handleOptionChange = (value: string) => {
        navigate(value);
    };

    return (
        <>
            <RadioSelector
                name={''}
                options={options}
                value={initialAssetType}
                onOptionChange={handleOptionChange}
            />

            <AssetsRoutes />
        </>
    );
};
