// dbConfig.js
const mysql = require('mysql2');
const {MysqlConfig} = require("@/config/mysql.config");

const pool = mysql.createPool(MysqlConfig);

export const db = pool.promise();
