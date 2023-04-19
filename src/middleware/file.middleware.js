const path = require("path")

const multer = require("koa-multer")
const Jimp = require("jimp")

const {
  AVATAR_PATH,
  PICUTURE_PATH
} = require("../constants/file-path")

const avatarUpload = multer({
  dest: AVATAR_PATH
})

const avatarHandler = avatarUpload.single("avatar")

const picutureUpload = multer({
  dest: PICUTURE_PATH
})

const picutureHandler = picutureUpload.array("picuture", 9)

// 调整图片大小(根据不同场景显示不同分辨率图片)
const picutureResize = async (ctx, next) => {
  try {
    // 1. 获取所有的图像信息
    const files = ctx.req.files

    // 2. 对图像进行处理 第三方库 sharp/jimp sharp(path).resize
    for (const file of files) {
      const destPath = path.join(file.destination, file.filename)
      Jimp.read(file.path).then((img) => {
        // write() 写入到目标
        img.resize(1280, Jimp.AUTO).write(`${destPath}-larget`) // 调整图片大小，宽度1280 Jimp.AUTO(等比缩放)
        img.resize(640, Jimp.AUTO).write(`${destPath}-middle`)
        img.resize(320, Jimp.AUTO).write(`${destPath}-small`)
      })
    }

    await next()
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
  avatarHandler,
  picutureHandler,
  picutureResize
}