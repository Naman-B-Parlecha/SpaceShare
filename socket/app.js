import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});

let onlineUser = [];

const addUser = (userId, socketId) => {
  const userExits = onlineUser.find((user) => user.userId === userId);
  if (!userExits) {
    onlineUser.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  const user = onlineUser.find((user) => user.userId === userId);
  console.log(user);
  return user;
};

io.on("connection", (socket) => {
  // when a user Logs in we give him a socket id
  socket.on("newUser", (userId) => {
    console.log(userId)
    addUser(userId, socket.id);
  });
  
  socket.on("sendMessage", ({ recieverId, data }) => {
    const reciever = getUser(recieverId);
    io.to(reciever.socketId).emit("getMessage", data);
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

io.listen("4000");
