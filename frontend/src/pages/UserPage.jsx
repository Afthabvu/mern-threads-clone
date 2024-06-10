import React from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";

const UserPage = () => {
  return (
    <>
      <UserHeader />
      <UserPost
        likes={1200}
        replies={481}
        postImg="/post1.png"
        postTitle="Lets talk about threads"
      />
      <UserPost
        likes={451}
        replies={100}
        postImg="/post2.png"
        postTitle="Nice tutorial"
      />
      <UserPost
        likes={320}
        replies={88}
        postImg="/post3.png"
        postTitle="I love this guy"
      />
      <UserPost
        likes={3200}
        replies={600}
        postTitle="This is my first thread"
      />
    </>
  );
};

export default UserPage;
