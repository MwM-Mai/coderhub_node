const connection = require("../app/database")

class FileService {
  async createAvatar(filename, mimetype, size, userId) {
    const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?);`

    try {
      const [result] = await connection.execute(statement, [filename, mimetype, size, userId])
      return result
    } catch (error) {
      console.log(error);
    }

  }

  async getAvatarByUserID(id) {
    const statement = `SELECT * FROM avatar WHERE user_id = ?;`
    try {
      const [result] = await connection.execute(statement, [id])
      return result[result.length - 1]
    } catch (error) {
      console.log(error);
    }
  }

  async createrPicutre(filename, mimetype, size, userId, momentId) {
    const statement = `INSERT INTO file (filename, mimetype, size, user_id, moment_id) VALUES (?, ?, ?, ?, ?);`
    try {
      const [result] = await connection.execute(statement, [filename, mimetype, size, userId, momentId])
      return result
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new FileService