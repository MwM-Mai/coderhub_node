const connection = require("../app/database")

class MomentService {
  async create(id, content) {
    const statement = `INSERT INTO moment (user_id, content) VALUES (?, ?);`

    const [result] = await connection.execute(statement, [id, content])
    return result  // 不是查询 返回的不是数组
  }

  async getMomentById(id) {
    const statement = `
      SELECT
        moment.id id, moment.content content, moment.createAt createTime, moment.updateAt updateTime,
        JSON_OBJECT("id", users.id, "name", users.name, "Avatar", users.avatar_url) AS users, # JSON_OBJECT() 以 json 格式返回
        (SELECT JSON_ARRAYAGG(CONCAT("http://localhost:8000/moment/images/",file.filename)) FROM file WHERE file.moment_id = moment.id) images # CONCAT(字符串拼接)
      FROM moment
      LEFT JOIN users ON moment.user_id = users.id 
      WHERE moment.id = ?;
    `

    const [result] = await connection.execute(statement, [id])

    return result[0] // 查询返回的是一个数组
  }

  async getMomentList(offset, size) {
    const statement = `
      SELECT
        moment.id id, moment.content content, moment.createAt createTime, moment.updateAt updateTime,
        JSON_OBJECT("id", users.id, "name", users.name) AS users, # JSON_OBJECT() 以 json 格式返回
        (SELECT COUNT(*) FROM comment WHERE comment.moment_id = moment.id) AS commentCount, # 子查询
        (SELECT COUNT(*) FROM moment_label WHERE moment_label.moment_id = moment.id) AS labelCount, # 子查询
        (SELECT JSON_ARRAYAGG(CONCAT("http://localhost:8000/moment/images/",file.filename)) FROM file WHERE file.moment_id = moment.id) images # CONCAT(字符串拼接)
      FROM moment
      LEFT JOIN users ON moment.user_id = users.id 
      LIMIT ?, ?;
    `

    const [result] = await connection.execute(statement, [offset, size])

    console.log(result);

    return result
  }

  async update(content, momentId) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`

    const [result] = await connection.execute(statement, [content, momentId])

    return result
  }

  async remove(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?;`

    try {
      const [result] = await connection.execute(statement, [momentId])
      console.log(result);
      return result
    } catch (error) {
      console.log(error);
    }

  }

  async hasLabel(momentId, labelId) {
    const statement = `SELECT * FROM moment_label WHERE label_id = ? AND moment_id =?;`

    try {
      const [result] = await connection.execute(statement, [labelId, momentId])

      return result[0] ? true : false
    } catch (error) {
      console.log(error);
    }
  }


  async addLabel(momentId, LabelId) {
    const statement = "INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);"

    try {
      const [result] = await connection.execute(statement, [momentId, LabelId])

      return result
    } catch (error) {
      console.log(error);
    }
  }

  async getPicutureInfoByfilename(name) {
    const statement = `SELECT * FROM file WHERE filename = ? ;`

    try {
      const [result] = await connection.execute(statement, [name])
      return result[0]
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new MomentService()