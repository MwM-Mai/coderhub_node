const AuthRouter = require("koa-router")

const {
  login,
  success
} = require("../controller/auth.controller")
const {
  verifyLogin,
  verrifyAuth
} = require("../middleware/auth.middleware")

const authRouter = new AuthRouter()

authRouter.post("/login", verifyLogin, login)
authRouter.get("/test", verrifyAuth, success)

module.exports = authRouter
