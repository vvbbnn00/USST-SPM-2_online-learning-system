import {MysqlConfig} from "@/config/mysql.config";
import mysql from 'mysql2';

const pool = mysql.createPool(MysqlConfig);

export const db = pool.promise();
