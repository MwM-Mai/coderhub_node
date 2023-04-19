const {
  getLabelById,
  create
} = require("../service/label.service")

const verifyLabelExists = async (ctx, next) => {
  // 1. 取出添加的所有标签
  const { labels } = ctx.request.body
  const newLabels = []

  // 2. 判断每一个标签是否在label表中
  for (const name of labels) {
    const label = { name }
    const labelResult = await getLabelById(name)
    if (!labelResult) {
      // 创建标签数据
      const result = await create(name)
      label.id = result.insertId
    } else {
      label.id = labelResult.id
    }

    newLabels.push(label)
  }

  console.log(newLabels);
  ctx.labels = newLabels

  await next()
}

module.exports = {
  verifyLabelExists
}