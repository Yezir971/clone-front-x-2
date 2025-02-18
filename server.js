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

    // gestions la déconnexion
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

    // Gestions de l'envoi des messages
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
    // socket pour écouter en temps réel les tweets
    socket.on('tweet', (newTweet) => {
      console.log(newTweet)
      io.emit('receiveTweets', newTweet.dataTweet)
    })
    // écoute les retweet 
    socket.on('retweet', (newTweet) => {
      console.log(newTweet.dataReTweet)
      io.emit('receiveTweets', newTweet.dataReTweet)
    })
    // écoute les likes des tweets, on essaye d'écouter les évenements sur des serveurs différents
    socket.on('like', ({dataLike, idTweet}) => {
      console.log(dataLike)
      console.log(idTweet)
      io.emit(`receiveLike_${idTweet}`, {dataLike})
    })

    // écoute les commentaires des tweets 
    socket.on('comment', (dataCommentaire,idTweet  ) => {
      console.log(dataCommentaire)
      io.emit(`comment_${idTweet}`, {dataCommentaire})
    })
    
  });

  httpServer.listen(port, hostname, () => {
    console.log(`🚀 Serveur WebSocket en écoute sur http://${hostname}:${port}`);
  });
});
