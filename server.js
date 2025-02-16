import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  });

  let onlineUser = [];

  io.on("connection", (socket) => {
    console.log("🟢 Un utilisateur est connecté : " + socket.id);

    // Gestion de la connexion
    socket.on("addNewUser", (userId) => {
      if (!onlineUser.some(user => user.userId === userId)) {
        onlineUser.push({ userId, socketId: socket.id });
        console.log('onlineUsers', onlineUser);
        io.emit('getOnlineUser', onlineUser);
      }
    });

    // Gérer la déconnexion
    socket.on("deleteUser", (userId) => {
      onlineUser = onlineUser.filter(user => user.userId !== userId);
      console.log('onlineUsers', onlineUser);
      io.emit('getOnlineUser', onlineUser);
    });

    // Gestion automatique de la déconnexion
    socket.on("disconnect", () => {
      onlineUser = onlineUser.filter(user => user.socketId !== socket.id);
      console.log(`🔴 Utilisateur déconnecté: ${socket.id}`);
      io.emit('getOnlineUser', onlineUser);
    });

    // Gérer l'envoi de messages
    socket.on('sendMessage', (msg) => {
      const { newMessage, idUserTarget } = msg;
      console.log('Message reçu:', newMessage.content);
      const user = onlineUser.find(user => user.userId == idUserTarget);

      if (user) {
        io.to(user.socketId).emit('receiveMessage', newMessage);
      }
    });

    // Gestion des notifications
    socket.on('notification', (dataNotif) => {
      const { dataNotification, idUserTarget } = dataNotif;
      const user = onlineUser.find(user => user.userId == idUserTarget);

      if (user) {
        io.to(user.socketId).emit('receiveNotification', dataNotification.notif);
        console.log(`Notification envoyée à : ${user.socketId} - ${dataNotification.notif}`);
      }
    });

    
  });

  httpServer.listen(port, hostname, () => {
    console.log(`🚀 Serveur WebSocket en écoute sur http://${hostname}:${port}`);
  });
});
