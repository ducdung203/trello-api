/* eslint-disable no-console */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import exitHook from 'async-exit-hook'
import { env } from '~/config/environment'

import { CLOSE_DB, CONNECT_DB } from '~/config/mongodb'
import { APIs_V1 } from '~/routes/v1'

const START_SERVER = () => {
  const app = express()

  app.use('/v1', APIs_V1)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`${env.AUTHOR}, I am running at http://${ env.APP_HOST }:${ env.APP_PORT }/`)
  })

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


