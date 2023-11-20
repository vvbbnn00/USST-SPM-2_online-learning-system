"use server";
import nextAppSession, {promisifyStore} from 'next-app-session';
import Redis from 'ioredis';
import RedisStore from 'connect-redis';
import {REDIS_HOST, REDIS_PORT} from "@/config/redis";

const store = process.env.NODE_ENV === 'production' ? promisifyStore(new RedisStore({
    client: new Redis({
        host: REDIS_HOST,
        port: REDIS_PORT
    }),
    prefix: 'online-learning:session:'
})) : null;

export const session = nextAppSession({
    name: 'AUTH_SESSION',
    secret: '0n1in3-l3arn1ng(Sy5t3m)_0d000721.114514',
    store: store
});
