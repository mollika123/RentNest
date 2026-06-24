import { serverFetch } from "../core/server";
import { getUserSession } from "../core/session";

export const getOwnerAgency = async (ownerId) => {
    if (!ownerId) {
        console.error("❌ getOwnerAgency Error: ownerId is undefined or null");
        return null;
    }
    return serverFetch(`/api/my/agency?ownerId=${ownerId}`);
}

export const getLoggedInAgency = async () => {
    const user = await getUserSession();

    if (!user) {
        console.error("❌ No logged in user found");
        return null;
    }
    return getOwnerAgency (user?.id ||user?._id);
}