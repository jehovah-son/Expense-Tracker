import { currentUser } from "@clerk/nextjs/server";

import { Db } from "@/lib/db";

export const checkUser = async () => {
    const user = await currentUser();


    //check for current user
    // If no user is found, return null
    if (!user) {
        return null;
    }

    // Check if the user is already in the database

    const loggedInUser = await Db.user.findUnique({
        where: {
            clerkUserId: user.id,
        },
    });


    //if user exists in the database, return the user object
    if (loggedInUser) {
        return loggedInUser;
    }

    // If the user does not exist, create a new user in the database
    const newUser = await Db.user.create({
        data: {
            clerkUserId: user.id,
            email: user.emailAddresses[0].emailAddress,
            name: `${user.firstName} ${user.lastName}`,
            imageURL: user.imageUrl,
        },
    })

    return newUser;
}