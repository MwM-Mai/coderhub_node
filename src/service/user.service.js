const connection = require("../app/database")

class UserService {
  // 创建用户
  async create(user) {
    // 将user存储到数据库中
    const { name, password } = user

    const statement = `INSERT INTO users (name, password) VALUES (?, ?);`

    const result = await connection.execute(statement, [name, password])

    return result[0] // result[0] 为真正是数据数组
  }

  // 查询用户是否存在
  async getUserByname(name) {
    const statement = `SELECT * FROM users WHERE name = ?;`
    const reslut = await connection.execute(statement, [name])
    return reslut[0]
  }

  // 保存头像
  async updateAvatarUrlById(id, url) {
    const statement = `UPDATE users SET avatar_url = ? WHERE id = ?;`
    try {
      const [reslut] = await connection.execute(statement, [url, id])
      return reslut
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new UserService