const db = require("../../data/db-config")

const getAll = () => {
  // DO YOUR MAGIC
  const result = db('accounts')
  return result
}

const getById = async id => {
  // DO YOUR MAGIC
  const result = await db('accounts').where('id', id).first()
  return result
}

const create = async account => {
  const [id] = await db('accounts').insert(account)
  return getById(id)
}

const updateById = async(id, account) => {
  // DO YOUR MAGIC
  await db('accounts').where('id',id).update(account)
  return getById(id)
}

const deleteById = async id => {
  // DO YOUR MAGIC
  const accountDeleted = getById(id)
  await db('accounts').del().where('id', id)
  return accountDeleted
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
