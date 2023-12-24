import nextAppSession, {promisifyStore} from 'next-app-session';
import Redis from 'ioredis';
import RedisStore from 'connect-redis';
import {REDIS_HOST, REDIS_PORT} from "@/config/redis";

export const sessionScore = promisifyStore(new RedisStore({
    client: new Redis({
        host: REDIS_HOST,
        port: REDIS_PORT,
        connectTimeout: 1000,
    }),
    prefix: 'online-learning:session:'
}));

export const session = nextAppSession({
    name: 'AUTH_SESSION',
    secret: '0n1in3-l3arn1ng(Sy5t3m)_0d000721.114514',
    store: sessionScore
});


export const cacheStore = new Redis({
    host: REDIS_HOST,
    port: REDIS_PORT,
    keyPrefix: 'online-learning:cache:',
    connectTimeout: 1000,
});

export const convertAsync = (task, context) => {
    return (...args) => {
        return new Promise((resolve, reject) => {
            try {
                resolve(task.apply(context, args));
            } catch (err) {
                reject(err);
            }
        });
    };
};
