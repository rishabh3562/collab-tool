import { Query } from "appwrite"
import getInitialClient from "./getClient"

const getChats = async (id:string) => {
    const {client,account,databases} = getInitialClient()
    const res = await databases.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DB as string, process.env.NEXT_PUBLIC_APPWRITE_DB_CHATS as string, [Query.equal("project_id", [id])])
    console.log("res in chats",res)
    return res
}

export default getChats