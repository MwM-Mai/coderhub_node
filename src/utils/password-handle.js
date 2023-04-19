const { createHash } = require("crypto") // 利用 crypto 库 对密码进行MD5加密

const md5Password = (password) => {
  // createHash(加密方式) 获取加密之后的字符串是调用 digest(进制) 方法
  const result = createHash("md5").digest("hex")
  return result
}

module.exports = {
  md5Password
}