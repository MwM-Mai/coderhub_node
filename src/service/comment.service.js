const connection = require("../app/database")

class ComemntService {
  async create(userId, momentId, content) {
    const statement = `INSERT INTO comment (content, user_id, moment_id) VALUES (?, ?, ?);`

    try {
      const [result] = await connection.execute(statement, [content, userId, momentId])
      return [result]
    } catch (error) {
      console.log(error);
    }
  }

  async reply(userId, momentId, content, commentId) {
    const statement = `INSERT INTO comment (content, user_id, moment_id, comment_id) VALUES (?, ?, ?, ?);`

    try {
      const [result] = await connection.execute(statement, [content, userId, momentId, commentId])
      return [result]
    } catch (error) {
      console.log(error);
    }
  }

  async update(commentId, content) {
    const statement = `UPDATE comment SET content = ? WHERE id = ?;`

    const [result] = await connection.execute(statement, [content, commentId])

    return result
  }

  async remove(commentId) {
    const statement = `DELETE FROM comment WHERE id = ?;`

    const [result] = await connection.execute(statement, [commentId])

    return result
  }

  async getCommentsByMomentId(momentId) {
    console.log(momentId);
    const statement = `
      SELECT 
        comment.id id, comment.content content, comment.comment_id commentId,
        JSON_OBJECT("id", users.id, "name", users.name, "Avatar", users.avatar_url) user
      FROM comment 
      LEFT JOIN users ON comment.user_id = users.id
      WHERE moment_id = 1;
    `
    const [result] = await connection.execute(statement, [momentId])
    return result
  }
}

module.exports = new ComemntService()