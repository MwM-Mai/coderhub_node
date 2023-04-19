const Router = require("koa-router")

const momnetRouter = new Router({ prefix: "/moment" })
const {
  verrifyAuth,
  verifyPermission
} = require("../middleware/auth.middleware")
const {
  create,
  detail,
  list,
  update,
  remove,
  addLabels,
  picutureInfo
} = require("../controller/moment.controller")
const {
  verifyLabelExists
} = require("../middleware/label.middleware.js")


momnetRouter.post('/', verrifyAuth, create)
momnetRouter.get("/", list)
momnetRouter.get("/:momentId", detail)
// 1. 用户必须登录 2. 用户具备权限
momnetRouter.patch("/:momentId", verrifyAuth, verifyPermission("moment"), update)
momnetRouter.delete("/:momentId", verrifyAuth, verifyPermission("moment"), remove)

// 给动态添加标签
momnetRouter.post("/:momentId/labels", verrifyAuth, verifyPermission("moment"), verifyLabelExists, addLabels)

// 动态配图
momnetRouter.get("/images/:filename", picutureInfo)

module.exports = momnetRouter
