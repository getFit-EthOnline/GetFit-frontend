const env = process.env.NODE_ENV;
export const REDIRECT_URL =
    env === 'development'
        ? 'http://localhost:3000/move-to-earn'
        : 'https://getfit-ethonline.vercel.app/move-to-earn';
