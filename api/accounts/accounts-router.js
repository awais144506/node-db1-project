const Account = require('./accounts-model')
const router = require('express').Router()
const {checkAccountId} = require("./accounts-middleware")
router.get('/', (req, res, next) => {
  Account.getAll()
    .then(acc => {
      res.status(200).json(acc)
    })
    .catch(err => {
      next(err)
    })
})

router.get('/:id',checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Account.getById(req.params.id)
  .then(ac=>{
    res.status(200).json(ac)
  })
  .catch(err=>{
    next(err)
  })
})

router.post('/', (req, res, next) => {
  // DO YOUR MAGIC
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    message:err.message,
    customMessage:"There is a server error..."
  })
})

module.exports = router;
