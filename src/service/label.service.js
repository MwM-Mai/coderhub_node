const connection = require("../app/database")

class LabelService {
  async create(name) {
    try {
      const statement = `INSERT INTO label (name) VALUES (?);`
      const [result] = await connection.execute(statement, [name])
      return result
    } catch (error) {
      if (error.errno === 1062) {
        console.log(error);
      }
    }
  }

  async getLabelById(name) {
    const statement = 'SELECT * FROM label WHERE name = ?;'

    const [result] = await connection.execute(statement, [name])

    return result[0]
  }

  async getLabels(limit, offset) {
    const statement = 'SELECT * FROM label LIMIT ?,?;'

    try {
      const [result] = await connection.execute(statement, [offset, limit])
      return result
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new LabelService()