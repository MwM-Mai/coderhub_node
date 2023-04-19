// 导入mysql2 与数据库进行连接

const mysql = require("mysql2")

const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_ROOT,
  MYSQL_DATEBASE,
  MYSQL_PASSWORD
} = require("./config")

const connections = mysql.createPool({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  database: MYSQL_DATEBASE,
  user: MYSQL_ROOT,
  password: MYSQL_PASSWORD
})

// 测试是否连接成功
connections.getConnection((err, conn) => {
  conn.connect((err) => {
    if (err) {
      console.log("连接失败~", err);
    } else {
      console.log("数据库连接成功~")
    }
  })
})

module.exports = connections.promise()

