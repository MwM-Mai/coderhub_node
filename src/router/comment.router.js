const Router = require("koa-router")

const {
  verrifyAuth,
  verifyPermission
} = require("../middleware/auth.middleware")
const {
  create,
  reply,
  update,
  remove,
  list
} = require("../controller/comment.controller")


const commentRouter = new Router({ prefix: "/comment" })

// 发布评论
commentRouter.post("/", verrifyAuth, create)
// 返回评论
commentRouter.post("/:commentId/reply", verrifyAuth, reply)
// 修改评论
commentRouter.patch("/:commentId", verrifyAuth, verifyPermission("comment"), update)
// 删除评论
commentRouter.delete("/:commentId", verrifyAuth, verifyPermission("comment"), remove)
// 获取评论列表
commentRouter.get("/", list)


module.exports = commentRouter