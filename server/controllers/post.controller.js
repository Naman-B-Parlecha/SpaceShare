import prisma from "../lib/prisma.js";

export const getPosts = async (req, res, next) => {
  const query = req.query;
  console.log(query);
  try {
    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        property: query.property || undefined,
        price: {
          gte: parseInt(query.minPrice) || 0,
          lte: parseInt(query.maxPrice) || 1000000000000000,
        },
      },
    });
    setTimeout(() => {
      console.log(posts);
      res.status(200).json(posts);
    }, 3000);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch posts" });
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