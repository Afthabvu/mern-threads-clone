import { useCallback } from "react";
import useShowToast from "./useShowToast";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";

const useDeletePost = () => {
  const [posts, setPosts] = useRecoilState(postsAtom);
  const showToast = useShowToast();
  const deletePost = useCallback(async (postId) => {
    try {
      if (!window.confirm("Are you sure you want to delete this post?")) return;
      const res = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Post deleted", "success");
      setPosts(posts.filter((p)=>p._id !==postId))
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  }, []);

  return deletePost;
};

export default useDeletePost;
