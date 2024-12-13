import getInitialClient from "./getClient"
import { chat } from "@/types/chats"

const sendChats = async (msg: string, messages: string[], chatId: string) => {
    try {
        const { account, databases } = getInitialClient()
        const user = await account.get()
        const msgObject: chat = { email: user.email, name: user.name, message: msg }
        const newArr = [...messages, JSON.stringify(msgObject)]
        await databases.updateDocument(process.env.NEXT_PUBLIC_APPWRITE_DB as string, process.env.NEXT_PUBLIC_APPWRITE_DB_CHATS as string, chatId, {
            chats: newArr
        })
    } catch (error) {
        // console.log(error)
    }

}

export default sendChats