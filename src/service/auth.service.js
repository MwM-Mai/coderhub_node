const connection = require("../app/database")

class AuthService {
  // 查询动态权限
  async checkResource(tableName, userId, id) {
    const statement = `
      SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;
    `
    console.log(tableName, userId, id);
    try {
      const [result] = await connection.execute(statement, [id, userId])
      if (result.length > 0) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.log(error);
    }

  }


}

module.exports = new AuthService()