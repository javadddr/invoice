const express = require('express')
const router = express.Router()
const {getGols,setGols,
  updateGol,
  deleteGol} = require('./controller')



router.get('/',getGols)


router.post('/',setGols)


router.put('/:id',updateGol)


router.delete('/:id',deleteGol)


module.exports = router