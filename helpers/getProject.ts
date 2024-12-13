import getInitialClient from "./getClient"

export const getProject = async (id: string) => {
    console.log(`id = ${id}`)
    if (id) {
        const { databases } = getInitialClient()
        const data = await databases.getDocument(process.env.NEXT_PUBLIC_APPWRITE_DB as string, process.env.NEXT_PUBLIC_APPWRITE_DB_PROJECTS_COLLN as string, id)
        console.log(data)
        return data
    }
}