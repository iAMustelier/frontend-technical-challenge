import { AccountTxResponse } from 'xrpl';
import { capitalize, removePrefix } from './strings';
import { DateTime } from 'luxon';
import { isNullish } from './data';

// https://xrpl.org/basic-data-types.html#specifying-time
export const RIPPLE_EPOCH_OFFSET = 946684800;

// Expose the type of the transaction
export type AccountTransaction = AccountTxResponse['result']['transactions'][number];

export type SimplifiedPaymentTransaction = ReturnType<typeof mapPaymentTransaction>;

export const mapPaymentTransaction = (accountTransaction: AccountTransaction) => {
    if (isNullish(accountTransaction.tx)) {
        throw Error('Invalid transaction. Expected a transaction object.');
    }

    if (accountTransaction.tx?.TransactionType !== 'Payment') {
        throw Error("Invlaid transaction type. Expected 'Payment'.");
    }

    return {
        Account: accountTransaction.tx.Account,
        Type: accountTransaction.tx.TransactionType,
        Status:
            typeof accountTransaction.meta === 'string'
                ? accountTransaction.meta
                : accountTransaction.meta?.TransactionResult,
        DateTimeString: accountTransaction.tx.date,
        DateTime: DateTime.fromMillis(
            ((accountTransaction.tx.date ?? -RIPPLE_EPOCH_OFFSET) + RIPPLE_EPOCH_OFFSET) * 1000,
        ),
        Amount:
            typeof accountTransaction.tx.Amount === 'string'
                ? accountTransaction.tx.Amount
                : accountTransaction.tx.Amount?.value,
        Currency: 'XRP', // TODO: check how to get currency from transaction
        Receiver: accountTransaction.tx.Destination,
    };
};

export const formatStatus = (status: string) => {
    return capitalize(removePrefix(status, 'tes'));
};
