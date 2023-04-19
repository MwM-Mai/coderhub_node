const Router = require("koa-router")

const {
  avatarHandler,
  picutureHandler,
  picutureResize
} = require("../middleware/file.middleware")

const {
  verrifyAuth
} = require("../middleware/auth.middleware")

const {
  saveAvatarInfo,
  savePicutureInfo
} = require("../controller/file.controller")

const flieRouter = new Router({ prefix: "/upload" })

flieRouter.post("/avater", verrifyAuth, avatarHandler, saveAvatarInfo)
flieRouter.post("/picuture", verrifyAuth, picutureHandler, picutureResize, savePicutureInfo)

module.exports = flieRouter