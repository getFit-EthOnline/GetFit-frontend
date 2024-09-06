import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb };
    }

    try {
        await client.connect();
        const db = client.db('Cluster0');
        cachedClient = client;
        cachedDb = db;
        return { client, db };
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        throw error;
    }
}
