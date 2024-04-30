const userController = require("../Controllers/user.controller");
const chatController = require("../Controllers/chat.controller");
module.exports = function (io) {
  io.on("connection", async (socket) => {
    console.log("client is connected", socket.io);
    socket.on("login", async (username, cb) => {
      try {
        const user = await userController.saveUser(username, socket.id);
        const welcommessage = {
          chat: `${user.name} is joined to this room`,
          user: { id: null, name: "system" },
        };
        io.emit("message", welcommessage);
        cb({ ok: true, data: user });
      } catch (err) {
        cb({ ok: false, error: err.message });
      }
    });
    socket.on("disconnect", () => {
      console.log("user is disconnected");
    });
    socket.on("sendMessage", async (message, cb) => {
      try {
        //socket id로 유저찾기
        const user = await userController.checkUser(socket.id);

        //메세지 저장
        const newMessage = await chatController.saveChat(message, user);
        io.emit("message", newMessage);
        cb({ ok: true });
      } catch (err) {
        cb({ ok: false, error: err.message });
      }
    });
  });
};
