import { Account, Client, Databases } from "appwrite"

const getInitialClient = () => {
    const client = new Client();

    client
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);
    const account = new Account(client)
    const databases = new Databases(client)
// console.log(databases)
    return {client, account, databases}
}

export default getInitialClient