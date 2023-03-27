import { Client } from 'xrpl';

export const getAccountInfo = async (client: Client, account: string) =>
    await client?.request({
        command: 'account_info',
        account,
        ledger_index: 'validated',
    });

export const getAccountTransactions = async (client: Client, account: string) =>
    await client?.request({
        command: 'account_tx',
        account,
        ledger_index_min: -1,
        ledger_index_max: -1,
        limit: 10,
    });

export const getAccountLines = async (client: Client, account: string) =>
    await client?.request({
        command: 'account_lines',
        account,
    });

export const getAccountNFTs = async (client: Client, account: string) =>
    await client?.request({
        command: 'account_nfts',
        account,
        ledger_index: 'validated',
    });
