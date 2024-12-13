import { Account } from "appwrite";
import getInitialClient from "./getClient";

const getClient = async () => {
    const {account} = getInitialClient()
    const promise = await account.get();
    return promise
}

export default getClient