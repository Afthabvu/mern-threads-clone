import { useCallback } from "react";
import useShowToast from "./useShowToast";

const useDeletePost = () => {
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
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  }, []);

  return deletePost;
};

export default useDeletePost;
