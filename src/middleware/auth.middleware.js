const jwt = require("jsonwebtoken")

const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  USER_DOES_NOT_EXISTS,
  PASSWORD_IS_INCORRENT,
  UNAUTHORIZATION,
  UNPERMISSION
} = require("../constants/error-types")
const service = require("../service/user.service")
const { md5Password } = require("../utils/password-handle")
const { PUBLIC_KEY } = require("../app/config")
const AuthService = require('../service/auth.service')

// 登录验证
const verifyLogin = async (ctx, next) => {
  // 1. 获取用户名和密码
  const { name, password } = ctx.request.body

  // 2. 判断用户名和密码是否为空
  if (!name || !password) {
    const error = new Error(NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }

  // 3. 判断用户是否存在(用户不存在)
  const result = await service.getUserByname(name)
  const user = result[0]
  // result.length 有值表示存在数据
  if (!user) {
    const error = new Error(USER_DOES_NOT_EXISTS)
    return ctx.app.emit("error", error, ctx)
  }

  // 4. 判断密码是否和数据库中的密码是一致(加密)
  if (md5Password(password) !== user.password) {
    const error = new Error(PASSWORD_IS_INCORRENT)
    return ctx.app.emit("error", error, ctx)
  }

  // 把从数据库查到的user保存到ctx里面
  ctx.user = user

  await next()
}

// token验证
const verrifyAuth = async (ctx, next) => {
  console.log("验证授权的middlware~");
  // 1. 获取 token
  const authorization = ctx.headers.authorization
  if (!authorization) {
    const error = new Error(UNAUTHORIZATION)
    return ctx.app.emit("error", error, ctx)
  }
  const token = authorization.replace("Bearer ", "")

  // 2. 验证 token
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"]
    })
    ctx.user = result
    await next()
  } catch (error) {
    console.log(error);
    const err = new Error(UNAUTHORIZATION)
    ctx.app.emit("error", err, ctx)
  }
}

// 验证权限的中间件
/**
 * 1. 很多的内容都需要验证权限: 修改/删除动态, 修改/删除评论
 * 2. 接口: 业务接口系统/后台管理系统
 */
const verifyPermission = (tableName) => {
  return async (ctx, next) => {
    console.log("验证权限的middleware~");

    // 1. 获取参数
    let resourceId = tableName + "Id"
    resourceId = ctx.params[resourceId];
    const { id } = ctx.user

    // 2. 查询是否具备权限
    try {
      const isPermission = await AuthService.checkResource(tableName, id, resourceId)
      if (!isPermission) throw new Error(UNPERMISSION)
      await next() // koa 框架 使用的是 Promise
    } catch (err) {
      console.log(err);
      const error = new Error(UNPERMISSION)
      return ctx.app.emit("error", error, ctx)
    }

  }
}

module.exports = {
  verifyLogin,
  verrifyAuth,
  verifyPermission
}