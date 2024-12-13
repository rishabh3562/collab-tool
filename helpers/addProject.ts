import { ID, Models } from "appwrite";
import getInitialClient from "./getClient";
import { UserPreferences } from "typescript";

export const addProject = async (
  projectName: string,
  data: Models.User<Models.Preferences>,
  mode: "solo" | "collab"
) => {
  const { databases } = getInitialClient();
  const project_id = ID.unique();
  try {
    // Create the project document
    const creation = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DB as string,
      process.env.NEXT_PUBLIC_APPWRITE_DB_PROJECTS_COLLN as string,
      project_id,
      {
        admin: data?.email,
        users: [data["$id"]],
        name: projectName,
      }
    );

    // Create chat document only if it's not a solo project
    if (mode !== "solo") {
      const chatCreation = await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DB as string,
        process.env.NEXT_PUBLIC_APPWRITE_DB_CHATS_COLLN as string,
        ID.unique(),
        {
          project_id: creation["$id"],
          chats: [], // Initialize 'chats' as an empty array
        }
      );

    //   console.log("Chat created", chatCreation); // Check that chat is created successfully
    }

    return { id: creation["$id"], success: true };
  } catch (err) {
    console.log(err);
    return { success: false };
  }
};
