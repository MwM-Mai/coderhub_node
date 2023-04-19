const fs = require("fs")

const {
  create,
  getMomentById,
  getMomentList,
  update,
  remove,
  hasLabel,
  addLabel,
  getPicutureInfoByfilename
} = require("../service/moment.service")
const {
  PICUTURE_PATH
} = require("../constants/file-path")

class MomentController {
  async create(ctx, next) {
    // 1. 获取数据(user_id, content)
    const userId = ctx.request.body.id
    const content = ctx.request.body.content

    //  2. 将数据插入到数据库
    const result = await create(userId, content)

    ctx.body = result
  }

  async detail(ctx, next) {
    // 1. 获取数据
    const momentId = ctx.params.momentId
    console.log(ctx.params.momentId);

    // 2. 根据 id 查询这条数据
    const result = await getMomentById(momentId)

    ctx.body = result
  }

  async list(ctx, next) {
    // 1. 获取数据(offset/size)
    const { offset, size } = ctx.query

    try {
      const result = await getMomentList(offset, size)
      ctx.body = result
    } catch (error) {
      console.log(error);
    }
  }

  async update(ctx, next) {
    const { momentId } = ctx.params
    const { content } = ctx.request.body

    const result = await update(content, momentId)

    ctx.body = result
  }

  async remove(ctx, next) {
    const { momentId } = ctx.params

    const result = await remove(momentId)

    ctx.body = result
  }

  async addLabels(ctx, next) {
    // 1. 获取标签和动态id
    const { labels } = ctx
    const { momentId } = ctx.params

    console.log("labels", labels);

    // 2. 添加所有标签 
    for (const label of labels) {
      // 2.1判断标签是否和动态有关系
      const isExists = await hasLabel(momentId, label.id)
      if (!isExists) {
        await addLabel(momentId, label.id)
      }
    }

    ctx.body = "给动态添加标签~"
  }

  async picutureInfo(ctx, next) {
    let { filename } = ctx.params
    const { type } = ctx.query
    const types = ["small", 'middle', "large"]

    const fileInfo = await getPicutureInfoByfilename(filename)

    ctx.response.set("content-type", fileInfo.mimetype)
    // some() 判断数组中是否存在该字符串
    if (types.some(item => item === type)) {
      filename = `${filename}-${type}`
    }

    ctx.body = fs.createReadStream(`${PICUTURE_PATH}/${filename}`)
  }
}

module.exports = new MomentController()