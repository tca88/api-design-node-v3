import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import config from './config'
import cors from 'cors'
import { signup, signin, protect } from './utils/auth'
import { connect } from './utils/db'
import userRouter from './resources/user/user.router'
import itemRouter from './resources/item/item.router'
import listRouter from './resources/list/list.router'
import router from './resources/item/item.router'

export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.post('/signup', signup)
app.post('/signin', signin)

app.use('/api', protect)
app.use('/api/user', userRouter)
app.use('/api/item', itemRouter)
app.use('/api/list', listRouter)

router.get('/me', (req, res) => {
  res.send({ me: 'hello ' })
})

//cats
// const routes = ['get /cat', 'get cat/:id', 'post /cat', 'put /cat/:id', 'delete /cat/:id']

// router.route('/cat')
// .get()
// .post()

app.get('/', (req, res) => {
  res.send({ message: 'hello' })
})

const log = (req, res) => {
  console.log('logging')
  next()
}

app.get('/data', (req, res) => {
  res.send({ data: [1, 2, 3] })
})

app.post('/', (req, res) => {
  console.log(req.body)
  res.send({ message: 'ok' })
})

app.post('/data', (req, res) => {
  // console.log(req.body)
  res.send(req.body)
})

// export const start = async () => {
//   try {
//     await connect()
//     app.listen(config.port, () => {
//       console.log(`REST API on http://localhost:${config.port}/api`)
//     })
//   } catch (e) {
//     console.error(e)
//   }
// }

export const start = () => {
  app.listen(3000, () => {
    console.log('server is on 3000')
  })
}
