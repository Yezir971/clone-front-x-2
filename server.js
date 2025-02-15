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
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 Un utilisateur est connecté : " + socket.id);

    // Réception et diffusion d'un message
    socket.on("sendMessage", (message) => {
      console.log("📩 Message reçu :", message);
      socket.broadcast.emit("receiveMessage", message); // Diffuse à tous les clients
    });

    socket.on("disconnect", () => {
      console.log("🔴 Un utilisateur s'est déconnecté : " + socket.id);
    });
  });

  httpServer.listen(port, () => {
    console.log("🚀 Serveur WebSocket en écoute sur http://localhost:3000");
  });
});