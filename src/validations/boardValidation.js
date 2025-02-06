/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  const correctConditon = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict(),
  })

  try {
    //chỉ định abortEarly: false để hiển thị nhiều lỗi validation
    await correctConditon.validateAsync(req.body, { abortEarly: false })
    // validaton dữ liệu xong hợp lệ thì cho request đi tiếp sang controller
    next()

  } catch (error) {
    // console.log(error)
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message
    })
  }
}

export const boardValidation = {
  createNew
}