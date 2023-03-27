import { getServerInfo } from 'services';
import { ServerInfoResponse } from 'xrpl';
import { useClient } from 'hooks';
import { useEffect, useState } from 'react';

type ServerInfo =
    | {
          loading: true;
          data?: undefined;
          error?: unknown;
      }
    | {
          loading: false;
          data: ServerInfoResponse;
          error?: unknown;
      };

export const useServerInfo = (): ServerInfo => {
    const [serverInfo, setServerInfo] = useState<ServerInfoResponse>();
    const [loadingServerInfo, setLoadingServerInfo] = useState(true);
    const [error, setError] = useState<unknown>();

    const { client, loading: loadingClient } = useClient();

    useEffect(() => {
        (async () => {
            if (loadingClient) return;

            setLoadingServerInfo(true);
            setError(null);

            try {
                const serverInfo = await getServerInfo(client);
                setServerInfo(serverInfo);
            } catch (e) {
                setError(e);
            }

            setLoadingServerInfo(false);
        })();
    }, [client, loadingClient]);

    if (loadingServerInfo || loadingClient) return { loading: true };

    return {
        data: serverInfo as ServerInfoResponse,
        loading: false,
        error,
    };
};
