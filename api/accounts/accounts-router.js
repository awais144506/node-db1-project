const Account = require('./accounts-model')
const router = require('express').Router()
const { checkAccountId, checkAccountPayload, checkAccountNameUnique } = require("./accounts-middleware")
router.get('/', (req, res, next) => {
  Account.getAll()
    .then(acc => {
      res.status(200).json(acc)
    })
    .catch(err => {
      next(err)
    })
})

router.get('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Account.getById(req.params.id)
    .then(ac => {
      res.status(200).json(ac)
    })
    .catch(err => {
      next(err)
    })
})

router.post('/', checkAccountNameUnique, checkAccountPayload, async (req, res, next) => {
  try {
    const payload = await Account.create({
      name:req.body.name.trim(),
      budget:req.body.budget
    })
    res.status(201).json(payload)
  }
  catch (err) {
    next(err)
  }
})

router.put('/:id', checkAccountNameUnique, checkAccountPayload, (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Account.deleteById(req.params.id)
    .then(acc => {
      res.status(200).json(acc)
    })
    .catch(error => {
      next(error)
    })
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message
  })
})

module.exports = router;
