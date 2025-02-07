/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  try {
    // console.log(req.body)
    res.status(StatusCodes.CREATED).json({ message: 'POST from controller: API create new board' })

    throw new ApiError(StatusCodes.BAD_GATEWAY, 'test error')
  } catch (error) {next(error)}
}

export const boardController = {
  createNew
}
