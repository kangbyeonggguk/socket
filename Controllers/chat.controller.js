const chatController = {};
const chat = require("../Models/chat");
const user = require("../Models/user");

chatController.saveChat = async (message, user) => {
  const newMessage = new chat({
    chat: message,
    user: { id: user._id, name: user.name },
  });
  await newMessage.save();
  return newMessage;
};

module.exports = chatController;
