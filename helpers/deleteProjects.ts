import { Models } from "appwrite"
import getInitialClient from "./getClient"
import { QueryClient, useQueryClient } from "react-query"

const deleteProject = async (project: Models.Document, userData:any, queryClient: QueryClient) => {
    const {databases} = getInitialClient()
    // console.log("project in delete project", project)
    if (userData.email === project["admin"]) {
        databases.deleteDocument(process.env.NEXT_PUBLIC_APPWRITE_DB as string, process.env.NEXT_PUBLIC_APPWRITE_DB_PROJECTS_COLLN as string, project["$id"])
            .then((res) => queryClient.invalidateQueries("projects"))
            .catch((err) => {
                alert("Couldn't delete ! some error occuered")
                // console.log(err)
            })
    }
    else if (project["users"].includes(userData["$id"])) {
        // console.log("here")
        const newArr = project.users?.filter((x: string) => x !== userData["$id"])
        // console.log(newArr)
        databases.updateDocument(process.env.NEXT_PUBLIC_APPWRITE_DB as string, process.env.NEXT_PUBLIC_APPWRITE_DB_PROJECTS_COLLN as string, project["$id"], {
            users: newArr
        })
            .then((res) => queryClient.invalidateQueries("projects"))
            .catch((err) => {
                alert("Couldn't delete ! some error occuered")
                // console.log(err)
            })
    }

}

export default deleteProject