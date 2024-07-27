import prisma from ".././lib/prisma.js";

export const getChats = async (req, res, next) => {
  const tokenUserId = req.userId;
  try {
    const chats = await prisma.chat.findMany({
      where: {
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
    });
    console.log("here");
    console.log(chats);
    for (const c of chats) {
      const recieverId = c.userIDs.find((id) => id !== tokenUserId);
      console.log(recieverId);
      if (recieverId) {
        const reciever = await prisma.user.findUnique({
          where: { id: recieverId },
          select: {
            avatar: true,
            username: true,
            id: true,
          },
        });
        c.reciever = reciever;
      }
    }
    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch Chats" });
  }
};
export const getChat = async (req, res, next) => {
  const tokenUserId = req.userId;
  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
    await prisma.chat.update({
      where: {
        id: chat.id,
      },
      data: {
        seenBy: {
          push: [tokenUserId],
        },
      },
    });
    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch Chat" });
  }
};
export const addChat = async (req, res, next) => {
  const userTokenId = req.userId;
  try {
    const chat = await prisma.chat.create({
      data: {
        userIDs: [userTokenId, req.body.recieverId],
      },
    });
    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json({ message: "Failed to add Chat" });
  }
};
export const readChat = async (req, res, next) => {
  const tokenUserId = req.userId;
  try {
    const chat = await prisma.chat.update({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      data: {
        seenBy: {
          push: [tokenUserId],
        },
      },
    });
    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json({ message: "Failed to read Chats" });
  }
};
