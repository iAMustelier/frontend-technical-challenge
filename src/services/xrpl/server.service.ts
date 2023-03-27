import { Client, ServerInfoResponse } from 'xrpl';

export const getServerInfo = async (client: Client): Promise<ServerInfoResponse> =>
    await client?.request({
        command: 'server_info',
    });
