import React from "react";
import { Suspense } from "react";
import getUser from "lib/getUser";
import getUserPosts from "lib/getUserPosts";

type Params = {
  params: {
    userId: string;
  };
};

export default async function UserPage({ params: { userId } }: Params) {
  const userData: Promise<User> = getUser(userId);
  const userPostData: Promise<Post[]> = getUserPosts(userId);

  const [user, userPosts] = await Promise.all([userData, userPostData]);
  return (
    <>
      <h2>{user.name}</h2>
      <br />
      <Suspense fallback={<h2>Loading...</h2>}>
        <UserPost posts={userPosts} />
      </Suspense>
    </>
  );
}
