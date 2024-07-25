import prisma from "../lib/prisma.js";

export const getPosts = async (req, res) => {
  const query = req.query;

  try {
    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrice) || undefined,
          lte: parseInt(query.maxPrice) || undefined,
        },
      },
    });

    // setTimeout(() => {
    console.log(posts);
    res.status(200).json(posts);
    // }, 3000);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get posts" });
  }
};

export const getPost = async (req, res, next) => {
  const id = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch post" });
  }
};

export const addPost = async (req, res, next) => {
  const body = req.body;
  const tokenId = req.userId;
  try {
    const response = await prisma.post.create({
      data: {
        ...body.postData,
        userId: tokenId,
        postDetail: {
          create: { ...body.postDetail },
        },
      },
    });
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add new post" });
  }
};

export const updatePost = async (req, res, next) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update post" });
  }
};

export const deletePost = async (req, res, next) => {
  const id = req.params.id;
  const tokenId = req.userId;

  try {
    const post = await prisma.post.findUnique({ where: { id } });
    if (post.userId !== tokenId) {
      return res.status(403).json({ message: "Not Authorized" });
    }
    const response = await prisma.post.delete({ where: { id } });
    res.status(200).json({ message: "Post deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete post" });
  }
};
export const savePost = async (req, res, next) => {
  const postId = req.body.postId;
  const tokenId = req.userId;

  try {
    const savedPost = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          userId: tokenId,
          postId,
        },
      },
    });
    if (savedPost) {
      await prisma.savedPost.delete({ where: { id: savedPost.id } });
      res.status(200).json({ message: "Removed Post from saved" });
    } else {
      await prisma.savedPost.create({
        data: { postId: postId, userId: tokenId },
      });
      res.status(200).json({ message: "Added post to saved" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete post" });
  }
};
