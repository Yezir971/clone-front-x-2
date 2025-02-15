import mongoose from 'mongoose';


const connect = async () => {
    if (mongoose.connections[0].readyState) {
        console.log(mongoose.connections);
        console.log(mongoose.connections[0]);
        console.log(mongoose.connections[0].readyState);
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'CloneX',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connecté à MongoDB");
    } catch (error) {
        console.error('Problème de connexion :', error.message);
        throw new Error("Échec de la connexion à la base de données 💩");
    }
}

// Système de cache pour éviter les connexions multiples
let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectDb = async () => {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        cached.promise = connect();
    }

    try {
        cached.conn = await cached.promise;
        return cached.conn;
    } catch (error) {
        cached.promise = null;
        throw error;
    }
}

export default connectDb ;  // Si tu veux exposer cette fonction pour l'utiliser ailleurs
