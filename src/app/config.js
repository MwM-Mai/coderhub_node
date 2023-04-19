const dotenv = require("dotenv")
const fs = require("fs")
const path = require("path")

// 调用config函数把根目录下面的 .env 文件加载到环境变量 process.env
dotenv.config();

console.log(process.env.APP_PORT);

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, "./keys/private.key"))
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, "./keys/private.key"))

module.exports = {
  APP_HOST,
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_ROOT,
  MYSQL_DATABASE,
  MYSQL_PASSWORD
} = process.env

module.exports.PRIVATE_KEY = PRIVATE_KEY
module.exports.PUBLIC_KEY = PUBLIC_KEY