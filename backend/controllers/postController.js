import Post from "../models/postModel.js";
import User from "../models/userModel.js";

export const createPost = async (req, res) => {
  try {
    const { postedBy, text, img } = req.body;
    if (!postedBy || !text) {
      res
        .status(400)
        .json({ message: "postedBy and text fields are required" });
    }
    const user = await User.findById(postedBy);
    if (!user) {
      res.status(400).json({ message: "User not found" });
    }
    if (user._id.toString() !== req.user._id.toString()) {
      res.status(401).json({ message: "Unauthorized" });
    }
    const maxLength = 500;
    if (text.length > maxLength) {
      res
        .status(400)
        .json({ message: `Text must be less than ${maxLength} characters` });
    }
    const newPost = new Post({ postedBy, text, img });
    await newPost.save();
    res.status(201).json({ message: " Post created Succesfully", newPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "post found", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
    }
    if (post.postedBy.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ message: "UnAutnorized to delete this post" });
    }
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted Succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const likeUnlikePost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const userId = req.user._id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const userLikedPost = post.likes.includes(userId);
    if (userLikedPost) {
      //unlike Post
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      res.status(200).json({ message: "Post unliked succesfully" });
    } else {
      //like post
      post.likes.push(userId);
      await post.save();
      res.status(200).json({ message: "Post liked Succesfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
