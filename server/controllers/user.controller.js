import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
export const getUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const getUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

export const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const tokenID = req.userId;
  if (id !== tokenID) {
    return res.status(403).json({ message: "Not Authorized" });
  }
  const { password, avatar, ...inputs } = req.body;
  let hashedPassword = null;
  try {
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }
    const updateUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(hashedPassword && { password: hashedPassword }),
        ...(avatar && { avatar }),
      },
    });

    const { password: userPassword, ...newInfo } = updateUser;
    res.status(200).json(newInfo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update user" });
  }
};

export const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  const tokenID = req.userId;
  if (id !== tokenID) {
    return res.status(403).json({ message: "Not Authorized" });
  }

  try {
    await prisma.user.delete({ where: { id } });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete users" });
  }
};
