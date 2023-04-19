const path = require('path')

const {
  createAvatar,
  createrPicutre
} = require("../service/file.service")
const {
  updateAvatarUrlById
} = require("../service/user.service")
const {
  AVATAR_PATH
} = require("../constants/file-path")
const {
  APP_HOST,
  APP_PORT
} = require("../app/config")

class FileController {
  async saveAvatarInfo(ctx, next) {
    // 1. 获取 图像相关信息
    const { mimetype, filename, size } = ctx.req.file
    const { id } = ctx.user

    // 2. 将图像信息数据保存到数据库中
    const result = await createAvatar(filename, mimetype, size, id)

    // 3. 将图片地址保存到users表中
    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`

    await updateAvatarUrlById(id, avatarUrl)

    ctx.body = result
  }

  async savePicutureInfo(ctx, next) {
    // 1. 获取图像信息
    const files = ctx.req.files
    const { id } = ctx.user
    const { momentId } = ctx.query

    // 2. 将所有文件信息保存到数据库中

    for (const file of files) {
      const { mimetype, filename, size } = file
      const result = await createrPicutre(filename, mimetype, size, id, momentId)
    }

    ctx.body = "动态配图上传成功~"
  }
}

module.exports = new FileController()