import { Client } from 'xrpl';
import { isNullish } from 'utils';

export class ClientSingleton {
    private static instance: Client;

    public static getInstance(url: string): Client {
        if (isNullish(ClientSingleton.instance)) {
            ClientSingleton.instance = new Client(url);
        }
        return ClientSingleton.instance;
    }
}
