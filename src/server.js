/* eslint-disable no-console */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import cors from 'cors'
import { corsOptions } from './config/cors'
import exitHook from 'async-exit-hook'
import { env } from '~/config/environment'

import { CLOSE_DB, CONNECT_DB } from '~/config/mongodb'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'
import e from 'express'

const START_SERVER = () => {
  const app = express()
  //xử lí cors
  app.use(cors(corsOptions))

  app.use(express.json())

  app.use('/v1', APIs_V1)

  //Middleware xử lí lỗi tập trung
  app.use( errorHandlingMiddleware )

  if (env.BUILD_MODE === 'production') {
    app.listen(process.env.PORT, () => {
      console.log(`Production: ${env.AUTHOR}, I am running at http://${ env.APP_HOST }:${ env.APP_PORT }/`)
    })
  } else {
    //môi trường dev
    app.listen(env.APP_PORT, env.APP_HOST, () => {
      console.log(`Local DEV: ${env.AUTHOR}, I am running at http://${ env.APP_HOST }:${ env.APP_PORT }/`)
    })
  }

  exitHook( () => {
    console.log('')
    CLOSE_DB()
  })

}

(async () => {
  try {
    console.log('Connected to MongoDB Cloud Atlas....')
    await CONNECT_DB()
    console.log('Connected to MongoDB Cloud Atlas!')

    //khởi động Server Back-end sau khi đã Connect Database thành công
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

// //chỉ khi kết nối database mới START_SERVER
// CONNECT_DB()
//   .then(() => console.log('Connected to MongoDB Cloud Atlas!'))
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.error(error)
//     process.exit(0)
//   })


