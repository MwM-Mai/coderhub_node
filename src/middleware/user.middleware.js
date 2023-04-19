const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  USER_ALREADY_EXISTS
} = require("../constants/error-types")

const service = require("../service/user.service")

const { md5Password } = require("../utils/password-handle")

// 对注册用户进行验证
const verifyUser = async (ctx, next) => {
  // 1. 获取用户名和密码
  const { name, password } = ctx.request.body

  // 2. 判断用户名或者密码不能为空
  if (!name || !password) {
    const error = new Error(NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }

  // 3. 判断这次注册的用户名是没有被注册过的
  const result = await service.getUserByname(name)
  // result.length 有值表示存在数据
  if (result.length) {
    const error = new Error(USER_ALREADY_EXISTS)
    return ctx.app.emit("error", error, ctx)
  }

  await next()
}

// 对密码进行加密
const handlePassword = async (ctx, next) => {
  let { password } = ctx.request.body
  ctx.request.body.password = md5Password(password)

  await next()
}

module.exports = {
  verifyUser,
  handlePassword
}