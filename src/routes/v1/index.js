/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRouter } from './boardRoute'
import { columnRouter } from './columnRouter'
import { cardRouter } from './cardRouter'

const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'API V1 are ready to use '})
})

// Board APIs
Router.use('/boards', boardRouter)

// Column APIs
Router.use('/columns', columnRouter)

// Card APIs
Router.use('/cards', cardRouter)

export const APIs_V1 =Router
