const Account = require('./accounts-model')
exports.checkAccountPayload =async (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
}

exports.checkAccountNameUnique = async(req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountId = async(req, res, next) => {
  // DO YOUR MAGIC
  try {
        const account =await Account.getById(req.params.id)
        if(account)
        {
          req.body=account
          next()
        }
        else
        {
          next({status:404,message:"account not found"})
        }
  }
  catch (error) {
    next(error)
  }
}
