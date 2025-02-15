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
      origin: "http://localhost:3000", // Autorise le client Next.js
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  });

  let onlineUser = []
  io.on("connection", (socket) => {
    console.log("🟢 Un utilisateur est connecté : " + socket.id);

    // Gestion de la connection
    socket.on("addNewUser", (userId) => {
      !onlineUser.some(user=>user.userId === userId) && //si c'est égale l'utilisateur est connecter 
        onlineUser.push({
          userId, 
          socketId: socket.id
        })
        console.log('onlineUsers', onlineUser)
        io.emit('getOnlineUser', onlineUser)
    });

    // on gère la déconection 
    socket.on("deleteUser", (userId) => {
      // on vérifie que l'utilisateur est bien connecter 
      onlineUser = onlineUser.filter((element) => {
        element.userId !== userId
      })
      console.log('onlineUsers', onlineUser)
      io.emit('getOnlineUser', onlineUser)
    })

    // Gérer l'envoi de messages
    socket.on('sendMessage', (msg) => {
      const { newMessage, idUserTarget } = msg; // Déstructure correctement
      console.log('Message reçu:', newMessage.content);
      console.log('Utilisateur cible:', idUserTarget);
      console.log(msg)
      const user = onlineUser.find((user) => user.userId == idUserTarget);
      // console.log(newMessage.content)
      // console.log(onlineUser)
      // console.log(user)
      
      if (user) {
        // Envoie uniquement à l'utilisateur destinataire
        io.to(user.socketId).emit('receiveMessage', newMessage);
        // console.log("message envoyer à :"  + newMessage.content + user.socketId)
      }
      });
    // gestions des notifications 
    socket.on('notification', (dataNotif) => {
      const { dataNotification, idUserTarget } = dataNotif
      console.log(dataNotification)
      console.log(idUserTarget)
      console.log(dataNotif)
      // on cherche parmis les utilisateur connecter 
      const user = onlineUser.find((user) => user.userId == idUserTarget);
      if (user) {
        // Envoie uniquement à l'utilisateur destinataire
        io.to(user.socketId).emit('recieveNotification', dataNotification.notif);
        console.log("Une notif à été envoyer à :"  + user.socketId + " " +dataNotification.notif )
      }
    })
  });


  httpServer.listen(port,hostname, () => {
    console.log(`🚀 Serveur WebSocket en écoute sur http://${hostname}:${port}`);
  });
});