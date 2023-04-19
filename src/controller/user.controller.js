const fs = require("fs")
const path = require('path')

const service = require("../service/user.service")
const {
  getAvatarByUserID
} = require("../service/file.service")
const {
  AVATAR_PATH
} = require("../constants/file-path")

class UserController {
  async create(ctx, next) {
    // 获取用户请求传递的参数
    const user = ctx.request.body

    // 查询数据
    const result = await service.create(user)

    // 返回数据
    ctx.body = result
  }

  async avatarInfo(ctx, next) {
    const { userId } = ctx.params

    const result = await getAvatarByUserID(userId)
    // console.log(result);

    // 提供图像信息
    ctx.response.set("content-type", result.mimetype) // 记录类型 让浏览器识别到是图片 不会当作文件下载到电脑
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${result.filename}`)

  }
}

module.exports = new UserController()