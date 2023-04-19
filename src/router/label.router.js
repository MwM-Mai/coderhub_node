const Router = require("koa-router")

const {
  verrifyAuth
} = require("../middleware/auth.middleware")
const {
  create,
  list
} = require("../controller/label.controller")


const labelRouter = new Router({ prefix: "/label" })

labelRouter.post("/", verrifyAuth, create)
labelRouter.get("/", verrifyAuth, list)

module.exports = labelRouter
