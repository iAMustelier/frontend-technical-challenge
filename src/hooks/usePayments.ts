import { mapPaymentTransaction } from 'utils';
import { useAccountTransactions } from 'hooks';

export const usePayments = (account: string) => {
    const transactionsData = useAccountTransactions(account);

    const payments = transactionsData.transactions
        ?.filter((t) => t.tx?.TransactionType === 'Payment')
        .map(mapPaymentTransaction);

    return {
        ...transactionsData,
        transactions: payments,
    };
};
