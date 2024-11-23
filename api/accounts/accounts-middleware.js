const Account = require('./accounts-model')
const db = require("../../data/db-config")
exports.checkAccountPayload =  (req, res, next) => {
  const error = { status: 400 }
  const { name, budget } = req.body
console.log(name,budget)
  if (!name||!budget||name === undefined || budget === undefined) error.message = 'name and budget are required';
  if (error.message) {
    next(error)
  }
  else {
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const existedAccount = await db('accounts').where('name', req.body.name.trim()).first()
    if (existedAccount) {
      next({ status: 400, message: "that name is taken" })
    }
    else {
      next()
    }
  }
  catch (err) {
    next(err)

  }
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await Account.getById(req.params.id)
    if (account) {
      req.body = account
      next()
    }
    else {
      next({ status: 404, message: "account not found" })
    }
  }
  catch (error) {
    next(error)
  }
}
