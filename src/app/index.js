const Koa = require("koa")

// 解析请求 json 格式
const koaParser = require("koa-bodyparser")

// const userRouter = require("../router/user.router")
// const authRouter = require("../router/auth.router")
const { errorHandle } = require("./error-handle")
const { useRoutes } = require("../router")

const app = new Koa()

app.use(koaParser())

// app.use(userRouter.routes())
// app.use(userRouter.allowedMethods()) // 用于判断userROuter的某个请求方式是否存在

// app.use(authRouter.routes())
// app.use(authRouter.allowedMethods())

// 封装函数 遍历 router 文件夹 调用 app.use
// useRoutes(app) 另外方法如下给app添加 useRoutes 方法
app.useRoutes = useRoutes
app.useRoutes()

// 监听错误信息
app.on("error", errorHandle)

module.exports = app