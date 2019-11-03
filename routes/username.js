var express = require('express')
var router = express.Router()
const Username = require('../models/username')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var fs = require('fs')
var auth = require('./auth')

var privateKey = fs.readFileSync('private.key')
// var publicKey = fs.readFileSync('public.key')

router.post('/register', async (req, res, next) => {
  const hash = bcrypt.hashSync(req.body.password, 1)
  const newuser = new Username({
    username: req.body.username,
    password: hash,
    createdatetime: new Date()
  })
  await newuser.save()
  res.status(201).send('create success')
})

router.post('/login', async (req, res, next) => {
  try {
    const user = await Username.findOne({
      username: req.body.username
    })
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign({
          username: user.username
        }, privateKey, { algorithm: 'RS256', expiresIn: 60 * 60 })
        res.send({
          msg: 'login success',
          token: token
        })
      } else {
        res.status(401).send('password invalid')
      }
    } else {
      res.status(401).send('username invalid')
    }
  } catch (error) {
    next(error)
  }
})

router.get('/data', auth, async (req, res, next) => {
  try {
    // const token = req.headers.token
    // jwt.verify(token, publicKey, { algorithms: ['RS256'] }, async (err, decode) => {
    //   if (err) throw err
    //   const data = await Username.find()
    //   res.send(data)
    // })
    // const data = await Username.find()
    const data = await Username.findOne({
      username: req.username
    })
    res.send(data)
  } catch (err) {
    next(err)
  }
})

module.exports = router
