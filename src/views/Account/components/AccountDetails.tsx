import { AccountRoot } from 'xrpl/dist/npm/models/ledger';
import { dropsToXrpFormatted, formatAmount } from 'utils';
import { ReactComponent as XrpLogo } from 'assets/xrp-logo.svg';
import { useServerInfo } from 'hooks';

export interface AccountDetailsProps {
    accountInfo: AccountRoot | undefined;
}

export const AccountDetails = ({ accountInfo }: AccountDetailsProps) => {
    const {
        data: serverInfo,
        loading: loadingServerInfo,
        error: errorServerInfo,
    } = useServerInfo();

    if (!accountInfo) return <h2>Loading...</h2>;
    if (errorServerInfo) return <h2>Error loading server info...</h2>;

    let reserve = -1;
    if (!loadingServerInfo) {
        const {
            result: {
                info: { validated_ledger },
            },
        } = serverInfo;

        reserve =
            (validated_ledger?.reserve_base_xrp ?? 0) +
            (validated_ledger?.reserve_inc_xrp ?? 0) * accountInfo.OwnerCount;
    }

    return (
        <div>
            <p className="lg:text-4xl md:text-3xl text-2xl font-bold">{accountInfo.Account}</p>
            <div className="flex justify-between my-16">
                <div className="flex flex-col">
                    <p>XRP BALANCE</p>
                    <div className="flex items-center">
                        <XrpLogo width="7%" className="mr-1" />
                        <p className="md:text-3xl">{dropsToXrpFormatted(accountInfo.Balance, 2)}</p>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <p>ACCOUNT INFO</p>
                    <div className="flex items-center">
                        <span>RESERVE:</span>
                        <XrpLogo className="ml-2 mr-1 w-4" />
                        <p className="text-sm font-bold">
                            {reserve === -1 ? '...' : formatAmount(reserve, 2)}
                        </p>
                    </div>

                    <div className="flex items-center">
                        <span>CURRENT SEQUENCE:</span>
                        <span className="ml-1 font-bold">
                            {accountInfo.Sequence.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
