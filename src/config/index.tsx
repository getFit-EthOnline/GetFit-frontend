const env = process.env.NODE_ENV;
export const REDIRECT_URL =
    env === 'development'
        ? 'http://localhost:3000/prediction'
        : 'https://getfit-chatbot.vercel.app/prediction';
