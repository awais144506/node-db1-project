const Account = require('./accounts-model')
const db = require("../../data/db-config")
exports.checkAccountPayload =  (req, res, next) => {
  const errorMessage = { status: 400 }
  const { name, budget } = req.body
console.log(name,budget)
  if (name===undefined || budget === undefined) errorMessage.message = 'name and budget are required';
  else if(name.trim().length<3||name.trim().length>100) errorMessage.message = 'name of account must be between 3 and 100';
  else if(isNaN(budget)||typeof budget!=='number') errorMessage.message='budget of account must be a number'
  else if(budget<0 || budget>1000000) errorMessage.message='budget of account is too large or too small'
  if (errorMessage.message) {
    next(errorMessage)
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
      req.account = account
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
