export const MysqlConfig = {
    host: process.env.MYSQL_HOST || '192.168.19.2',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'password',
    database: process.env.MYSQL_DATABASE || 'online_learning',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 10
}
