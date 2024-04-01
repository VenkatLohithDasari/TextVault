import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface Cached {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
}

declare global {
    // eslint-disable-next-line no-var
    var mongoose: Cached;
}

// Initialize or retrieve the cached connection
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDB(): Promise<mongoose.Connection> {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts: mongoose.ConnectOptions = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose.connection;
        }).catch(err => {
            cached.promise = null;
            throw err;
        });
    }

    try {
        // Await the connection promise and cache the resolved connection
        cached.conn = await cached.promise;
        return cached.conn;
    } catch (err) {
        throw new Error(`Failed to connect to the database: ${err}`);
    }
}

export default connectToDB;