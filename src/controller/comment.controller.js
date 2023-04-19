const {
  create,
  reply,
  update,
  remove,
  getCommentsByMomentId
} = require("../service/comment.service")

class CommnetController {
  async create(ctx, next) {
    const { momentId, content } = ctx.request.body
    const { id } = ctx.user

    const result = await create(id, momentId, content)

    ctx.body = result
  }

  async reply(ctx, next) {
    const { commentId } = ctx.params
    const { momentId, content } = ctx.request.body
    const { id } = ctx.user

    const result = await reply(id, momentId, content, commentId)

    ctx.body = result
  }

  async update(ctx, next) {
    const { commentId } = ctx.params
    const { content } = ctx.request.body

    const result = await update(commentId, content)

    // const result = 
    ctx.body = result
  }

  async remove(ctx, next) {
    const { commentId } = ctx.params

    const result = await remove(commentId)

    ctx.body = result
  }

  async list(ctx, next) {
    const { momentId } = ctx.query
    const result = await getCommentsByMomentId(momentId)

    ctx.body = result
  }
}

module.exports = new CommnetController()